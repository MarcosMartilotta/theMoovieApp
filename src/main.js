//Axios
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});


//Utils 

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src',url); 
        }
    })
})

function renderPageMovies(pageName, movies, lazyLoad = false){
    pageName.innerHTML = "";
    movies.forEach(movie => {
        
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        if(movie.poster_path){
            movieImg.setAttribute(
                lazyLoad ? 'data-img': 'src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
    
            if(lazyLoad){
                lazyLoader.observe(movieImg);
            }

        } else {
            movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/adOzdWS35KAo21r9R4BuFCkLer6.jpg`); //Aca poner una imagen de 404
        }

        movieContainer.appendChild(movieImg);
        pageName.appendChild(movieContainer);
    })
}

function renderCategories(categories, container){
    container.innerHTML = "";

    categories.forEach(category => {
    
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', ()=> {
            location.hash = `#category=${category.id}-${category.name}`;
        })
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);

    })
}



// LLamados a la API
async function getTrendingMoviesPreview() {
    //peticion
    const { data } = await api(`trending/all/day`);
    const movies = data.results;
    renderPageMovies(trendingMoviesPreviewList, movies, true);
}

async function getMoviesByCategory(id) {
    //peticion
    const { data } = await api(`discover/movie?`, {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;

    renderPageMovies(genericSection, movies, true);
}

async function getCategoriesPreview() {
    //peticion
    const { data } = await api(`/genre/movie/list`);

    const categories = data.genres;

    renderCategories(categories, categoriesPreviewList)
}

async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    const movies = data.results;
    renderPageMovies(genericSection, movies, true);
}

async function getTrendingMovies() {
    //peticion
    const { data } = await api(`trending/movie/day`);
    const movies = data.results;
    renderPageMovies(genericSection, movies, true);
}

async function getMovieById(id) {
    const { data: movie } = await api(`movie/${id}`); //renombro el objeto data como movie

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieImgUrl})`;
    renderCategories(movie.genres, movieDetailCategoriesList);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
    console.log(relatedMovies);

    renderPageMovies(relatedMoviesContainer, relatedMovies);
    relatedMoviesContainer.scrollTop(0, 0);
}

