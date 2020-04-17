// api key: 65dada377a964d1ea4e91f8241e77c0a
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://newsapi.org/v2/everything?q=COVID&from=2020-03-16&sortBy=publishedAt&apiKey=&pageSize=100&page=2", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

// from: https://documenter.getpostman.com/view/8854915/SzS7NkEp?version=latest