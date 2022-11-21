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
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie='+element.id;
        })

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

async function getMovieByID(id){
    const {data : movie} = await api('movie/'+id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500'+movie.poster_path;
    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})
    `;


    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = Math.trunc(movie.vote_average);

    createCategories(movieDetailCategoriesList,movie.genres)
    getRelativesMoviesByID(id);
}

async function getRelativesMoviesByID(id){
    const {data} = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
    createMovies(relatedMoviesContainer,relatedMovies);
}


