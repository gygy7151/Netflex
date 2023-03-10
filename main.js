const $ = document;
const vaildKey = "7035c60c";
const homeButton = $.querySelector("header").querySelector("a");
const searchYearBar = $.querySelector(".year-search-bar");
const searchKeywordBar = $.querySelector(".keyword-search-bar");
const searchBtn = $.querySelector(".netflex-stick");
const moviesList = $.querySelector(".movies-container");
const alarmMessageDone = $.querySelector(".search-done-alarm");
const pageNotFoundMessage = $.querySelector(".hidden-alarm");
const bottomBanner = $.querySelector(".hidden-banner");
const goUpBotton = $.querySelector(".move-top");

let isDoneSearch = true;
// 검색 완료 알람을 보여주고
let showAlarmDoneSearch = false;
let nowPageNumber = 1;
let movies = [];

$.addEventListener("load", () => {
  setTimeout(setBottomBannerEffect(), 1000);
});

$.addEventListener("scroll", (e) => {
  scrollTimer.setup(e);
});

homeButton.addEventListener("click", () => {
  console.log("엥?");
  window.location.reload();
});

searchKeywordBar.addEventListener("keydown", (e) => {
  search(e, searchKeywordBar, searchYearBar);
});

searchYearBar.addEventListener("keydown", (e) => {
  search(e, searchKeywordBar, searchYearBar);
});

searchBtn.addEventListener("click", () => {
  nowPageNumber = 1;
  if (searchKeywordBar.value) {
    moviesList.innerHTML = "";
    getMovies(searchKeywordBar.value, searchYearBar.value);
  }
});

moviesList.addEventListener("click", (e) => {
  renderDetailView(e.target.dataset.id);
  showSkeletonLoading();
});

goUpBotton.addEventListener("click", () => {
  window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
});

const scrollTimer = {
  remind: function (e) {
    console.log(e);
    getMoreMovies(e);
    this.timerId = null;
  },

  setup: function (e) {
    if (typeof this.timerId === "number") {
      this.cancel();
    }

    this.timerId = setTimeout(this.remind, 300, e);
  },

  cancel: function () {
    clearTimeout(this.timerId);
  },
};

const search = (e, keywordBar, yearBar) => {
  console.log(yearBar.value);
  nowPageNumber = 1;
  if (
    e.key === "Enter" &&
    (searchKeywordBar.value !== "" || searchYearBar.value !== "")
  ) {
    moviesList.innerHTML = "";
    getMovies(keywordBar.value, yearBar.value ? yearBar.value : false);
    //js로 bottom banner 넓이를 줄여준다.
    resetBottomBannerSize(false);
  }

  if (
    e.key === "Backspace" &&
    (keywordBar.value.length === 0 || yearBar.value.length === 0)
  ) {
    //js로 bottom banner 넓이를 다시 넓혀준다
    resetBottomBannerSize(true);
  }
};

const removeAlertSearchingDone = () => {
  alarmMessageDone.classList.add("hidden");
  isDoneSearch = true;
};

const alertSearchDone = (notFound = false) => {
  if (moviesList.childElementCount > 0) {
    //영화목록이 최소 한개이상 있는 경우에만 보여준다. 안그러면 검색하기도 전에 알람창이 보여지는 버그가 발생된다.
    isDoneSearch = false;
    showAlarmDoneSearch = true;
  } else {
    isDoneSearch = true;
  }

  if (isDoneSearch === false && notFound) {
    alarmMessageDone.classList.remove("hidden");
    setTimeout(removeAlertSearchingDone, 1000);
  }
};

// 스크롤이벤트 관련 함수
const getMoreMovies = (e) => {
  const { scrollTop, clientHeight, scrollHeight } = e.target.scrollingElement;

  // 스크롤을 내리면 영화를 가져온다.
  if (
    Math.round(scrollTop) + clientHeight <= scrollHeight &&
    moviesList.childElementCount > 0
  ) {
    getMovies(searchKeywordBar.value, searchYearBar.value, false);
  }
};

const requestMovies = async (keyword, year) => {
  let moviesInfo;
  let movieList = [];
  if (year === false || !year) {
    for (let i = 0; i < 2; i++) {
      moviesInfo = await (
        await fetch(
          `https://omdbapi.com/?apikey=${vaildKey}&s=${keyword}&page=${
            nowPageNumber + i
          }`
        )
      ).json();
      console.log(moviesInfo);
      if (moviesInfo.Response !== "False") {
        console.log(moviesInfo.Search);
        movieList.push(...moviesInfo.Search);
      } else {
        if (movieList.length === 0 && showAlarmDoneSearch === false) {
          console.log("더이상 검색결과 없음!");
          alertSearchDone(true);
        }
      }
    }
    nowPageNumber += 2;
    return movieList;
  } else {
    for (let i = 0; i < 2; i++) {
      moviesInfo = await (
        await fetch(
          `https://omdbapi.com/?apikey=${vaildKey}&s=${keyword}&y=${Number(
            year
          )}&page=${nowPageNumber + i}`
        )
      ).json();
      console.log(moviesInfo);
      if (moviesInfo.Response !== "False") {
        console.log(moviesInfo.Search);
        movieList.push(...moviesInfo.Search);
      } else {
        if (movieList.length === 0 && showAlarmDoneSearch === false) {
          console.log("더이상 검색결과 없음!");
          console.log(nowPageNumber);
          alertSearchDone(true);
        }
      }
    }
    nowPageNumber += 2;
    return movieList;
  }
};

const getMovies = async (keyword, year, reset = true) => {
  movies = await requestMovies(keyword, year);
  // movies가 하나도 없을 때 예외처리 필요
  if (movies.length > 0) {
    renderMovies(reset);
  }
};

const renderMovies = (reset) => {
  const movieEls = movies.map((movie) => {
    const liEl = $.createElement("div");
    const postBox = $.createElement("div");
    const textBox = $.createElement("div");
    const posterEl = $.createElement("img");
    const titleEl = $.createElement("h2");
    const yearEl = $.createElement("h2");
    const detailButtonBox = $.createElement("div");
    const detailButton = $.createElement("img");
    const loadingCircle = $.createElement("div");

    // movie 데이터 변수 선언
    const title = movie.Title;
    const year = movie.Year;
    const poster = movie.Poster;

    // moveis-item 태그 및 하위태그 속성 정의
    titleEl.textContent = title;
    yearEl.textContent = year;
    posterEl.src = poster.slice(0, poster.length - 7) + "700.jpg";
    detailButton.src = "./store/netflix-logo.png";
    posterEl.dataset.id = movie.imdbID;
    textBox.dataset.id = movie.imdbID;
    detailButton.dataset.id = movie.imdbID;
    detailButtonBox.dataset.id = movie.imdbID;

    // moveis-item 태그 및 하위태그 클래스 추가
    liEl.classList.add("movies-item");
    postBox.classList.add("post-box");
    textBox.classList.add("text-box");
    yearEl.classList.add("movie-year");
    posterEl.classList.add("poster-image");
    loadingCircle.classList.add("loading");
    detailButtonBox.classList.add("detail-btn-box");
    detailButton.classList.add("detail-btn");

    // moveis-item 태그 하위요소 추가
    textBox.append(titleEl);
    textBox.append(yearEl);
    detailButtonBox.append(detailButton);
    postBox.append(loadingCircle);
    postBox.append(posterEl);
    postBox.append(textBox);
    postBox.append(detailButtonBox);
    liEl.append(postBox);

    posterEl.addEventListener("error", () => {
      posterEl.src = "./store/not-found.png";
      posterEl.style.opacity = "20%";
    });

    posterEl.addEventListener("load", () => {
      bottomBanner.style.opacity = "0";
      bottomBanner.style.position = "absolute";
      bottomBanner.style.height = "0px";
      postBox.querySelector(".loading").style.display = "none";
    });
    return liEl;
  });

  if (reset) {
    moviesList.innerHTML = "";
  }

  moviesList.append(...movieEls);
};

const resetBottomBannerSize = (searchingEnd) => {
  if (searchingEnd) {
    showAlarmDoneSearch = false;
    moviesList.innerHTML = "";
    bottomBanner.style.transform = "scale(1)";
    bottomBanner.style.position = "unset";
    bottomBanner.style.opacity = "1";
    bottomBanner.style.height = "initial";
  } else {
    bottomBanner.style.transform = "scale(1.5)";
  }
};

const renderDetailView = async (movieId) => {
  const movieDetailInfos = await (
    await fetch(`https://omdbapi.com/?apikey=${vaildKey}&i=${movieId}`)
  ).json();
  if (movieDetailInfos.Response === "True") {
    bindMovieData(movieDetailInfos);
  } else {
    renderFailDetailView();
  }
};

$.querySelector(".close-button").addEventListener("click", () => {
  hideDetailView();
});

const showSkeletonLoading = () => {
  const detailPageModal = $.querySelector(".show-detail-box");
  const titleBox = detailPageModal.querySelector(".title-box");
  const infoContainer = detailPageModal.querySelector(".info-container");
  const scoreContainer = detailPageModal.querySelector(".scoreboard-container");
  $.querySelectorAll(".skeleton-loading")[0].style.display = "flex";
  $.querySelectorAll(".skeleton-loading")[1].style.display = "flex";
  titleBox.style.opacity = "0";
  infoContainer.style.opacity = "0";
  scoreContainer.style.opacity = "0";
};

const hideSkeletonLoading = () => {
  $.querySelectorAll(".skeleton-loading")[0].style.display = "none";
  $.querySelectorAll(".skeleton-loading")[1].style.display = "none";
};

const showDetailView = () => {
  $.querySelector(".hidden-show-detail-wrapper").style.display = "block";
};

const hideDetailView = () => {
  $.querySelector(".hidden-show-detail-wrapper").style.display = "none";
};

const calculateRunTime = (timeStr) => {
  const minutes = Number(timeStr?.split(" ")?.[0]);
  if (isNaN(minutes)) {
    return "";
  }
  const hours = Math.trunc(minutes / 60);
  return (hours ? `${hours}h` : "") + ` ${minutes % 60}m`;
};

const getRottenTomatoScore = (movie) => {
  const ratings = movie.Ratings;
  let rottenScore = "-";
  if (ratings) {
    ratings.forEach((rating) => {
      console.log(rating.Value);
      if (rating.Source === "Rotten Tomatoes") {
        rottenScore = rating.Value;
      }
    });
  }
  return rottenScore;
};

const getAudienceScore = (movie) => {
  const ratings = movie.Ratings;
  let audienceScore = "-";
  if (ratings) {
    ratings.forEach((rating) => {
      if (rating.Source === "Metacritic") {
        audienceScore = `${rating.Value.split("/")[0]}%`;
      }
    });
  }
  return audienceScore;
};

const getRate = (movie) => {
  const ratedGrade = movie.Rated;
  if (isNaN(ratedGrade) || ratedGrade === "Not Rated") {
    return "R";
  }
  return ratedGrade ? ratedGrade : "R";
};

const getGenre = (movie) => {
  const type = movie.Genre.split(", ");
  if (type.length === 0 || type[0] === "N/A") return "movie";
  return type[0];
};

const bindMovieData = (movie) => {
  showDetailView();
  const detailPageModal = $.querySelector(".show-detail-box");
  const detailPageModalWrapper = $.querySelector(".hidden-show-detail-wrapper");
  const posterImg = $.querySelector(".poster-image");
  const scoreboardTitle = $.querySelector(".scoreboard-title");
  const titleBox = detailPageModal.querySelector(".title-box");
  const infoContainer = detailPageModal.querySelector(".info-container");
  const scoreContainer = detailPageModal.querySelector(".scoreboard-container");
  const tomatoContainer = $.querySelector(
    ".scoreboard-container"
  ).querySelector(".tomato-container");
  const audienceContainer = $.querySelector(
    ".scoreboard-container"
  ).querySelector(".audience-container");
  // 아래 스코어 undefined 예외처리
  let rated = getRate(movie);
  let genre = getGenre(movie);
  let runTime = calculateRunTime(movie.Runtime);
  let rottenTomatoScore = getRottenTomatoScore(movie);
  let audienceScore = getAudienceScore(movie);

  // 데이터 붙이기
  // 포스터 박스에 포스터 src 속성값을 지정한다.
  posterImg.src = movie.Poster.replace("SX300", "SX600");
  // 스코어 보드 타이틀에 textvalue 값에 movie.Title을 할당한다.
  scoreboardTitle.innerHTML = movie.Title;
  // info-container에 각 데이터 값을 할당한다.
  infoContainer.querySelector(".rating").innerHTML = rated;
  infoContainer.querySelector(
    ".scoreboard-info"
  ).innerHTML = `${movie.Year}, ${genre}, ${runTime}`;
  // scoreboard-container에 각 데이터 값을 할당한다.
  tomatoContainer.querySelector(".percentage").innerHTML = rottenTomatoScore;
  tomatoContainer.querySelector(".score-type").innerHTML = "TOMATOMETER";
  audienceContainer.querySelector(".percentage").innerHTML = audienceScore;
  audienceContainer.querySelector(".score-type").innerHTML = "AUDIENCE SCORE";

  posterImg.addEventListener("error", () => {
    posterImg.src = "./store/not-found.png";
  });

  posterImg.addEventListener("load", () => {
    hideSkeletonLoading();
    posterImg.style.display = "block";
    titleBox.style.opacity = "1";
    infoContainer.style.opacity = "1";
    scoreContainer.style.opacity = "1";
  });

  detailPageModal.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  detailPageModalWrapper.addEventListener("click", () => {
    hideDetailView();
  });
  window.addEventListener("scroll", (e) => {
    e.preventDefault();
  });
};

const renderFailDetailView = () => {};
