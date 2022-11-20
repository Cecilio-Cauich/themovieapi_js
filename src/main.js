// const { id } = require("date-fns/locale");

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    header:{
        'Content-Type':'application/json;charset=utf-8',
    },
    params:{
        'api_key':API_KEY,
    },
});

// utileria

function createMovies(container, movies){
    container.innerHTML = "";
    
    movies.forEach(element => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',element.title);
        movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300'+element.poster_path,);
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(container, categories){
    container.innerHTML = "";

    categories.forEach(category =>{

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id'+category.id);
        categoryTitle.addEventListener('click',()=>{
                location.hash = `#category=${category.id}-${category.name}`
        })

        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    })

}

// llamados a la api
async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;

    console.log({data, movies});

    createMovies(trendingMoviesPreviewList,movies);
}

async function getCategoriesPreview(){
    const {data} = await api('genre/movie/list');
    const categories = data.genres;

    // categoriesPreviewList.innerHTML = "";
    
    createCategories(categoriesPreviewList, categories);
}

async function getMoviesByCategory(id){
    const {data} = await api('discover/movie',{
        params:{
            with_genres: id,
        }
    });
    const movies = data.results;
    console.log({data, movies});

    createMovies(genericSection,movies);

}

async function getMoviesBySearch(query){
    const {data} = await api('search/movie',{
        params:{
            query,
        }
    });
    const movies = data.results;
    console.log({data, movies});

    createMovies(genericSection,movies);
}

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day');
    const movies = data.results;

    console.log({data, movies});

    createMovies(genericSection,movies);
}




