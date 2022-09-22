//Data
const api = axios.create({
    
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

function likeMovie(movie) {
    // movie.id
    const likedMovies = likedMoviesList(); //Devuelve el objeto donde la key es el id de cada pelicula

    if (likedMovies[movie.id]) { //Si existe lo pongo como undefined (pasa cuando lo apreto de nuevo)
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie; //Si no existe la agrego (pasa cuando no la aprete nunca)
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
    
}

//Utils 

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

function renderPageMovies(pageName, movies, { lazyLoad = false, clean = true } = {}) {

    if (clean) {
        pageName.innerHTML = "";
    }

    movies.forEach(movie => {

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src',
            `https://image.tmdb.org/t/p/w300/${movie.poster_path}`);

        movieImg.addEventListener('error', () => {
            movieImg.setAttribute(
                'src',
                'https://static.platzi.com/static/images/error/img404.png',
            );
        })

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked'); //dejo marcada la pelicula favorita
        movieBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            getLikedMovies();
            getTrendingMoviesPreview();
        });

        if (lazyLoad) {
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        pageName.appendChild(movieContainer);
    })
}

function renderCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container')

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', `id${category.id}`);
        categoryTitle.addEventListener('click', () => {
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
    const { data } = await api(`trending/all/day`, {
        params: {
            'language': language,
        }
    });
    const movies = data.results;
    renderPageMovies(trendingMoviesPreviewList, movies, { lazyLoad: true });
}

async function getMoviesByCategory(id) {
    //peticion
    console.log(languageSelector.value)
    const { data } = await api(`discover/movie`, {
        params: {
            with_genres: id,
            'language': language,
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;

    renderPageMovies(genericSection, movies, { lazyLoad: true });
}

function getPaginatedMoviesByCategory(id) {

    return async function () {

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api(`discover/movie`, {
                params: {
                    page,
                    with_genres: id,
                    'language': language,
                }
            });

            const movies = data.results;


            renderPageMovies(genericSection, movies, { lazyLoad: true, clean: false });

        }
    }
}


async function getCategoriesPreview() {
    console.log(language);
    //peticion
    const { data } = await api(`/genre/movie/list`, {
        params: {
            'language': language,
        }
    });

    const categories = data.genres;

    renderCategories(categories, categoriesPreviewList)
}


async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
            'language': language,
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;

    renderPageMovies(genericSection, movies, { lazyLoad: true });
}

function getPaginatedMoviesBySearch(query) {

    return async function () {

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('search/movie', {
                params: {
                    page,
                    query,
                    'language': language,
                }
            });

            const movies = data.results;


            renderPageMovies(genericSection, movies, { lazyLoad: true, clean: false });

        }
    }
}

async function getTrendingMovies() {
    //peticion
    const { data } = await api(`trending/movie/day`, {
        params: {
            'language': language,
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;
    renderPageMovies(genericSection, movies, { lazyLoad: true, clean: true });

}


async function getPaginatedTrendingMovies() {

    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api(`trending/movie/day`, {
            params: {
                page,
            }
        });

        const movies = data.results;

        renderPageMovies(genericSection, movies, { lazyLoad: true, clean: false });

    }
}


async function getMovieById(id) {
    const { data: movie } = await api(`movie/${id}`, {
        params: {
            'language': language,
        }
    }); //renombro el objeto data como movie

    const movieImgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    headerSection.style.background =
        `linear-gradient(180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), 
        url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    renderCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesId(id);
}


async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`, {
        params : {
            'language': language,
        }
    });
    const relatedMovies = data.results;
    console.log(relatedMovies);

    renderPageMovies(relatedMoviesContainer, relatedMovies);
}

//Llama a local Storage para agregarlas en la seccion de favoritas
function getLikedMovies() {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    renderPageMovies(likedMoviesListArticle, moviesArray, { lazyLoad: true, clean: true });
    
    console.log(likedMovies);
}

//Setea el lenguaje

function setLanguage () {
    languageSelector.addEventListener('change', () => {
        localStorage.setItem('savedLanguage', languageSelector.value);
        language = localStorage.getItem('savedLanguage');
        homePage();
    })
}
