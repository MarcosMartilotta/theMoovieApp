let maxPage;
let page = 1;
let infiniteScroll;
let language = localStorage.getItem('savedLanguage');

searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value.trim()}`; //Uso trim para eliminar espacios en blanco al inicio y al final
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends=';
});

arrowBtn.addEventListener('click', () => {

    location.hash = window.history.back();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);


// Validaciones
function navigator() {
    console.log( {location} );

    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {pasive : false});
        infiniteScroll = undefined;
    }
    
    if(location.hash.startsWith('#trends=')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')){
        searchPage()
    } else if (location.hash.startsWith('#movie=')){
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }
    
    window.scroll({top: 0 });
  /*   document.body.scrollTop = 0;
    document.documentElement.scrolltop = 0; */

    if(infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {pasive : false}); 
    }
}

// Paginas
function homePage(){
    console.log('Home!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive'); 
    headerCategoryTitle.classList.add('inactive'); 
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    languageSelector.classList.remove('inactive');
    getTrendingMoviesPreview();
    getCategoriesPreview();
    getLikedMovies();
    setLanguage();
}

function categoriesPage(){
    console.log('Categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.remove('inactive'); 
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    languageSelector.classList.add('inactive');


    const [_, categoryData] = location.hash.split('='); // [categotyId, categoryName]

    const [categoryId, categoryName] = categoryData.split('-'); //La url la armo con simbolos que pueda usar para separar y quedarme con el ID

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);

    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage(){
    console.log('Movie!!');

    headerSection.classList.add('header-container--long');
    /* headerSection.style.background = ''; */
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.add('header-arrow--white'); 
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.add('inactive'); 
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    languageSelector.classList.add('inactive');
    

    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
}

function searchPage(){
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.add('inactive'); 
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    languageSelector.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);

    infiniteScroll = getPaginatedMoviesBySearch(query);// esto no funciona sin hacer una closure porque se esta ejecutando
}

function trendsPage(){
    console.log('Trends!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.remove('inactive'); 
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    languageSelector.classList.add('inactive');


    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();

    infiniteScroll = getPaginatedTrendingMovies;
}