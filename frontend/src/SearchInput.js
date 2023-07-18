import KeywordHistory from "./KeywordHistory.js";

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $wrapper = document.createElement("section");
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.textContent = "랜덤";
    $randomButton.className = "RandomButton";
    $wrapper.appendChild($randomButton);

    $target.appendChild($wrapper);

    $searchInput.addEventListener("keypress", e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);

        //최근 키워드 저장
        this.KeywordHistory.addKeyword(e.target.value);
      }
    });

    $randomButton.addEventListener("click", e => {
      onRandomSearch();
    });

    this.KeywordHistory = new KeywordHistory({
      $target, onSearch
    })

    console.log("SearchInput created.", this);
  }
  render() {}
}

export default SearchInput;