console.log("app is running!");

import Loading from "./Loading.js";
import DarkModeToggle from "./DarkModeToggle.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import api from "./api.js";

class App {
  $target = null;
  data = [];
  page = 1;

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    });

    this.darkModeToggle = new DarkModeToggle({
      $target,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.Loading.show();

        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data? data : []);
          this.Loading.hide();
          this.saveResult(data);//로컬에 마지막 조회데이터 저장
        });
      },
      onRandomSearch: () => {
        console.log(`>>>random`);
        this.Loading.show();
        api.fetchRandomCats().then(({ data }) => {
          this.setState(data);
          this.Loading.hide();
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (cat) => {
        this.imageInfo.showDetail({
          visible: true,
          cat,
        });
      },
      onNextPage: () =>{
        console.log(">>>다음페이지 로딩");
        this.Loading.show();

  
        const keywordHistory = localStorage.getItem("keywordHistory") === null
          ? []
          : localStorage.getItem("keywordHistory").split(",");

        
        const lastKeyword = keywordHistory[0];
        const page = this.page+1;

        api.fetchCatsPage(lastKeyword,page).then(({data})=>{
          let newData = this.data.concat(data);
          console.log(">>>data",newData);
          this.setState(newData);
          this.page = page;
          this.Loading.hide();
        })
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result){
    console.log(`>>>result`, result);
    localStorage.setItem('lastResult',JSON.stringify(result));
  }

  init(){
    let lastResultData =
      localStorage.getItem("lastResult") === null
        ? []
        : JSON.parse(localStorage.getItem("lastResult"));

    this.setState(lastResultData);

    

  }
}


export default App;