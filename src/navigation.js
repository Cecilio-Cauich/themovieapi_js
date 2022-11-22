searchFormBtn.addEventListener('click',()=>{
    location.hash = '#search='+searchFormInput.value;
})

trendingBtn.addEventListener('click',()=>{
    location.hash = '#trends=';
})

arrowBtn.addEventListener('click',()=>{
    history.back();
    // location.hash = '#home';
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator(){
    // console.log({location});

    location.hash.startsWith('#trends')    ? trendPage()       :
    location.hash.startsWith('#search=')   ? searchPage()       :
    location.hash.startsWith('#movie=')    ? movieDetailsPage() :
    location.hash.startsWith('#category=') ? catergoryPage()   :
    homePage()
     
    location.hash

}


function homePage(){
//   console.log('Home Page!');

  headerSection.classList.remove('header-container--long');
  headerSection.style.background = '';
  arrowBtn.classList.add('inactive');
  arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.remove('inactive')
  headerCategoryTitle.classList.add('inactive');
  searchForm.classList.remove('inactive');


  trendingPreviewSection.classList.remove('inactive');
  categoriesPreviewSection.classList.remove('inactive');
  genericSection.classList.add('inactive');
  movieDetailSection.classList.add('inactive');

  getTrendingMoviesPreview();;
  getCategoriesPreview()
}

function trendPage(){
    // console.log('Trending!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    headerCategoryTitle.innerHTML = 'Tendencias';
    getTrendingMovies();
}

function searchPage(){
    // console.log('Search!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    //['#search','id-name']
    const [_,query]  = location.hash.split('=');
    const queryfinal = query.replace("%20"," ")
    getMoviesBySearch(queryfinal);
    
}

function movieDetailsPage(){
    // console.log('Movie!!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    const [_,movieId]  = location.hash.split('=');
    getMovieByID(movieId);
}

function catergoryPage(){
    // console.log('Category Page!!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
     
    const [_,categoryData]  = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');
    getMoviesByCategory(categoryId);
    headerCategoryTitle.innerHTML = categoryName;
    window.scroll(0,0);
}


