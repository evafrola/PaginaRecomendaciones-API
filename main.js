const container = document.getElementById('review-container');

const URL = 'http://localhost:3000/review'

let result = {};

fetch(URL)
.then( response => {
    if(response.ok) {
        return response.json();
    } else {
        throw Error(response.statusText);
    }
})
.then(function(response) {
    result.status = 'ok';
    result.data = response;
    return result;
})
.catch(function(error) {
    result.status = 'error';
    result.data = error;
    return result;
})

document.addEventListener('DOMContentLoaded', () => {

});