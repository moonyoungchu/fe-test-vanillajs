class DarkModeToggle {
  userColorScheme = null;

  constructor({ $target }) {
    const $DarkModeToggle = document.createElement("input");
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $target.appendChild($DarkModeToggle);

    $DarkModeToggle.addEventListener("change", (e) => {
      this.setColorMode(e.target.checked);
    });

    this.initColorMode();
    console.log("DarkModeToggle created.", this);
  }

  initColorMode() {
    //사용자 pc 다크모드인지 아닌지 판단
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.userColorScheme = "dark";
    } else {
      this.userColorScheme = "light";
    }

    console.log(">>>userColorScheme : ", this.userColorScheme);
    this.$DarkModeToggle.checked = this.userColorScheme === "dark";
    this.setColorMode(this.$DarkModeToggle.checked);
  }

  setColorMode(checkValue) {
    document.documentElement.setAttribute(
      "color-mode",
      checkValue ? "dark" : "light"
    );
  }

  render() {}
}
