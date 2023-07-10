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

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    $randomButton.addEventListener("click", e => {
      onRandomSearch();
    });


    console.log("SearchInput created.", this);
  }
  render() {}
}
