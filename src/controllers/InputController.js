export class InputController {
  constructor(selector) {
    this.htmlElement = document.querySelector(selector);
    this.value = "";
    this.handleEvents();
  }

  handleEvents() {
    this.addChangeEvent();
    this.addKeyPressEvent();
  }

  addChangeEvent() {
    this.htmlElement.addEventListener("input", (e) => {
      this.value = e.target.value;
      this.removeErrorClass();
      this.dispatchChangeInput();
    });
  }

  addErrorClass() {
    this.htmlElement.classList.add("error");
  }

  removeErrorClass() {
    this.htmlElement.classList.remove("error");
  }

  addKeyPressEvent() {
    this.htmlElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.dispatchValueInput();
    });
  }

  dispatchChangeInput() {
    const changeInputEvt = new CustomEvent("changeInput", {
      bubbles: true,
      detail: this.htmlElement.id,
    });
    this.htmlElement.dispatchEvent(changeInputEvt);
  }

  dispatchValueInput() {
    const valueInputEvt = new CustomEvent("valueInput", { bubbles: true });
    this.htmlElement.dispatchEvent(valueInputEvt);
  }
}
