/**
 *
 * @param {String} keyword
 * @param {Number} year
 */
const getRequestResponse = (keyword, year) => {};

let searchKeywordsList = [];
// 검색 키워드 값을 가져온다.
const setRecentKeywords = keyword => {
	if (searchKeywordsList.includes(keyword)) {
		return;
	}

	if (searchKeywordsList.length === 5) {
		searchKeywordsList.shift();
	}
	searchKeywordsList.push(keyword);
	localStorage.setItem("recentKeywords", JSON.stringify(searchKeywordsList));
	sessionStorage.setItem("recentKeywords", JSON.stringify(searchKeywordsList));
};

const renderRecentKeywords = async () => {
	recentSearchBox.innerHTML = "";
	const nowRecentKeywords = await JSON.parse(
		localStorage.getItem("recentKeywords")
	);
	if (nowRecentKeywords) {
		nowRecentKeywords.forEach(keyword => {
			const keywordTag = $.createElement("div");
			keywordTag.classList.add("recent-keyword");
			keywordTag.innerText = keyword;
			recentSearchBox.append(keywordTag);
		});
	}
};
