const BASE_URL = 'https://restcountries.com/v3.1';
const options = {};
function fetchCountries(searchQuery) {
    const url = `${BASE_URL}/name/${searchQuery}?fields=capital,name,population,flags,languages`;
    
    return fetch(url).then(response => {
        if (!response.ok) {
            throw Error();
        }
    return response.json();
    })
   
}

export default { fetchCountries };

