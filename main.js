const vaildKey = '7035c60c'
const searchBar = document.querySelector('.input-bar');
const searchBtn = document.querySelector('.netflex-stick');
const moviesList = document.querySelector('.movies-container')
const bottomBanner = document.querySelector('.hidden-banner')
let nowPageNumber = 1;
let movies = [];


searchBar.addEventListener('keydown', (e)=> {
  if(e.key === 'Enter') {
    getMovies(searchBar.value)
  };

  if(e.key === 'Backspace' && searchBar.value.length === 0){
    moviesList.innerHTML = '';
    bottomBanner.classList.remove('hidden');
    nowPageNumber = 1;
  }
})

searchBtn.addEventListener('click', ()=> {
  getMovies(searchBar.value)
})

const scrollTimer =  {

  remind: function(e) {
    getMoreMovies(e);
    this.timerId = undefined;
  },

  setup: function(e) {
    if(typeof this.timerId === 'number'){
      this.cancel();
    }

    this.timerId = setTimeout(this.remind, 300, e);
  },

  cancel: function(){
    clearTimeout(this.timerId);
  }

}


document.addEventListener('scroll', (e) => {
  scrollTimer.setup(e);
})

const showAlertMessage = () => {
  document.querySelector('.hidden-alarm').style.display = 'block'
  bottomBanner.classList.add('hidden');
}

const getMoreMovies = (e) => {
  const {scrollTop, clientHeight, scrollHeight} = e.target.scrollingElement;

  // 스크롤을 내리면 영화를 가져온다.
  if (Math.round(scrollTop) + clientHeight === scrollHeight) {
    getMovies(searchBar.value, false);
  }
}


const getMovies = async (keyword, reset = true) => {
  let movieList = [];
  this.apiRequest = async () => {
    for(let i=0; i<2; i++){
      const res = await (await fetch(`https://omdbapi.com/?apikey=${vaildKey}&s=${keyword}&page=${nowPageNumber+i}`)).json()
      console.log(res)
      return
      if(res.Response !== 'False') {
        movieList.push(...res.Search)
      }else{
        showAlertMessage();
      }
    }
  }
  await apiRequest();
  movies = movieList; 
  // movies가 하나도 없을 때 예외처리 필요
  if(movies.length > 0){
    renderMovies(reset);
  }

  nowPageNumber += 2;
}

const renderMovies = (reset) => {
  const movieEls = movies.map((movie)=> {
    const liEl = document.createElement('div');
    const postBox = document.createElement('div');
    const posterEl = document.createElement('img');
    const titleEl = document.createElement('h2');
    titleEl.textContent = movie.Title;
    posterEl.src = movie.Poster
    posterEl.addEventListener('error', () => {
      posterEl.src = "./store/not-found.png";
    })
    postBox.classList.add('post-box')
    postBox.append(posterEl);
    liEl.append(postBox, titleEl);
    liEl.classList.add('movies-item')
    return liEl;
  })

  if(reset){
    moviesList.innerHTML = '';
    bottomBanner.classList.add('hidden');
    
  }
  moviesList.append(...movieEls);
}

const alertUser = () => {
  alert('Error!!')
}

const resetImage = element => {
  element.src = "./store/not-found.png";
}
