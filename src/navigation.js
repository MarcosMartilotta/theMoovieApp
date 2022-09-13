
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


function navigator() {
    console.log( {location} );
    
    if(location.hash.startsWith('#trends=')) {
        trendsPage()
    } else if (location.hash.startsWith('#search=')){
        searchPage()
    } else if (location.hash.startsWith('#movie=')){
        moviesDetailsPage();
    } else if (location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }
    
    document.documentElement.scrolltop = 0;
    document.body.scrollTop = 0;
}

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
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    
    getTrendingMoviesPreview();
    getCategoriesPreview();
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
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

const [_, categoryData] = location.hash.split('='); // [categotyId, categoryName]

const [categoryId, categoryName] = categoryData.split('-'); //La url la armo con simbolos que pueda usar para separar y quedarme con el ID

headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
}
function moviesDetailsPage(){
    headerSection.classList.add('header-container--long');
    /* headerSection.style.background = ''; */
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.add('header-arrow--white'); 
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.add('inactive'); 
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    
    console.log('Movie!!');
}
function searchPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.add('inactive'); 
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    console.log('Search!!');

    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}
function trendsPage(){
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive'); 
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive'); 
    headerCategoryTitle.classList.remove('inactive'); 
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    console.log('Trends!!');

    headerCategoryTitle.innerHTML = 'Tendencias'
    getTrendingMovies();
}