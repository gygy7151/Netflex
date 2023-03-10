// select와 option 태그를 활용해 연도 선택 기능
const $ = document;
const selectYearBar = $.querySelector(".select-year");
const nowYear = new Date();
for (let i = nowYear.getFullYear(); i > 1989; i--) {
	const optionYear = $.createElement("option");
	optionYear.value = `${i}`;
	optionYear.innerText = `${i}`;
	selectYearBar.append(optionYear);
}
