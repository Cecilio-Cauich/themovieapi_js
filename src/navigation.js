window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator(){
    console.log({location});

    if(location.hash.startsWith('#trends')){
        trendPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    }else if(location.hash.startsWith('#category=')){
        catergoryPage();
    }else{
        homePage();
    }
     
    location.hash

}


function homePage(){
  console.log('Home Page!');
  getTrendingMoviesPreview();;
  getCategoriesPreview()
}

function trendPage(){
    console.log('Trends!');
}

function searchPage(){
    console.log('Search!!');
}
function movieDetailsPage(){
    console.log('Movie!!!')
}

function catergoryPage(){
    console.log('Category!!!')
}


