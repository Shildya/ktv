const APIKEY = '325e4a633b85a4ad0f68aa6594634b88';
let baseURL = 'https://api.themoviedb.org/3/';
let configData = null;
let baseImageURL = null;

let getConfig = function () {
    let url = "".concat(baseURL, 'configuration?api_key=', APIKEY); 
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        baseImageURL = data.images.secure_base_url;
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
    })
    .catch(function(err){
        alert(err);
    });
}

player = document.querySelector('.player');
closeIcon = document.querySelector('.close-icon');

closeIcon.addEventListener('click', () => {
    player.classList.remove('visible');
    closeIcon.classList.remove('visible');
    video.pause();
});
const video = document.querySelector('.movie-video');
const searchBar = document.querySelector('.search-bar');

searchBar.addEventListener('input', () =>{
    var keyword = searchBar.value;
    console.log(keyword);
    document.querySelector('.category-movies').innerHTML = '';
    document.querySelector('.category-series').innerHTML = '';
    url = ''.concat(baseURL, 'search/movie?api_key=', APIKEY, '&query=', keyword,'&language=fr-FR');
    fetch(url)
    .then(result=> result.json())
    .then((data)=>{
        //process the returned data
        results = data.results;
        results.forEach(result => {

            if (result.poster_path !== null) {
                var img = document.createElement('img'); 
                img.src = `https://image.tmdb.org/t/p/w185${result.poster_path}`;
                img.classList.add('movie');
                document.querySelector('.category-movies').appendChild(img);
                img.addEventListener('click', () => {
                    document.querySelector('.movie-title').innerHTML = result.title;
                    document.querySelector('.movie-description').innerHTML = result.overview;
                    document.querySelector('.movie-vote').innerHTML = 'Note: ' + result.vote_average + "/10 (Nombre d'avis: " + result.vote_count + ")";
                    document.querySelector('.movie-release-date').innerHTML = 'Date de sortie: ' + result.release_date;
                    player.classList.add('visible');
                    closeIcon.classList.add('visible');
                    video.pause();
                    video.currentTime = 0;
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                });
            }
        });
    });

    url = ''.concat(baseURL, 'search/tv?api_key=', APIKEY, '&query=', keyword,'&language=fr-FR');
    fetch(url)
    .then(result=> result.json())
    .then((data)=>{
        //process the returned data
        results = data.results;
        results.forEach(result => {
            if (result.poster_path !== null) {
                var img = document.createElement('img'); 
                img.src = `https://image.tmdb.org/t/p/w185${result.poster_path}`;
                img.classList.add('movie');
                document.querySelector('.category-series').appendChild(img);
                img.addEventListener('click', () => {
                    document.querySelector('.movie-title').innerHTML = result.name;
                    document.querySelector('.movie-description').innerHTML = result.overview;
                    document.querySelector('.movie-vote').innerHTML = 'Note: ' + result.vote_average + "/10 (Nombre d'avis: " + result.vote_count + ")";
                    document.querySelector('.movie-release-date').innerHTML = 'Début: ' + result.first_air_date;
                    player.classList.add('visible');
                    closeIcon.classList.add('visible');
                    video.pause();
                    video.currentTime = 0;
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                });
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', getConfig);