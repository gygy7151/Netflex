import vaildKey from "./httpRequest.js";
const $ = document;
const searchBar = $.querySelector(".input-bar");
const searchBtn = $.querySelector(".netflex-stick");
const moviesList = $.querySelector(".movies-container");
const bottomBanner = $.querySelector(".hidden-banner");
const selectYearBar = $.querySelector(".select-year");

// selectYearBar.addEventListener("click", e => {
// 	console.log(selectYearBar.querySelector("option").value);
// });

const nowYear = new Date();
for (let i = nowYear.getFullYear(); i > 1989; i--) {
	const optionYear = $.createElement("option");
	optionYear.value = `${i}`;
	optionYear.innerText = `${i}`;
	selectYearBar.append(optionYear);
}

selectYearBar.addEventListener("change", () => {
	console.log(selectYearBar.value);
});
