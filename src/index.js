import './css/styles.css';
import Notiflix from 'notiflix';
import API from './js/fetchCountries.js';
import getRefs from './js/getRefs.js';
import countrySearchTpl from './templates/countriesList.hbs';
import countryInfoTpl from './templates/countryInfo.hbs';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {

    clearCountries();

    const search = event.target.value;
    const searchQuery = search.trim();
   

    if (searchQuery === '') {
        return;
    }

    API.fetchCountries(searchQuery)
        .then(renderCountryMarkup)
        .catch(onFetchError);
}

function renderCountryMarkup(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');    
    }  
   
    if (countries.length > 1 && countries.length <= 10) {
        const markupList = countrySearchTpl(countries);
      refs.countryList.innerHTML = markupList;
        console.log(refs.countryList.innerHTML); 
    }
    if (countries.length === 1) {
        const markupInfo = countryInfoTpl(...countries);
        refs.countryInfo.innerHTML = markupInfo;
    }
    
}

function clearCountries() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
} 
    
    

