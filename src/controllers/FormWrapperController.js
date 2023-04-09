import { InputController } from "./InputController.js";

export class FormWrapperController {
  constructor(wrapperSelector, labelSelector, inputSelector, spanSelector) {
    this.htmlElement = document.querySelector(wrapperSelector);
    this.labelElement = document.querySelector(labelSelector);
    this.inputElement = new InputController(inputSelector);
    this.spanElement = document.querySelector(spanSelector);
    this.handleEvents();
  }

  handleEvents() {
    this.htmlElement.addEventListener("changeInput", () => {
      this.resetLabelError();
      this.resetSpanMessage();
    });
  }

  setLabelError() {
    this.labelElement.classList.add("error");
  }

  resetLabelError() {
    this.labelElement.classList.remove("error");
  }

  setInputError() {
    this.inputElement.addErrorClass();
  }

  resetInputError() {
    this.inputElement.removeErrorClass();
  }

  setSpanError(errorMessage) {
    this.spanElement.textContent = errorMessage;
  }

  resetSpanMessage() {
    this.setSpanError("");
  }

  setError(message) {
    this.setLabelError();
    this.setInputError();
    this.setSpanError(message);
  }

  resetErrors() {
    this.resetLabelError();
    this.resetInputError();
    this.resetSpanMessage();
  }

  getInputValue() {
    return this.inputElement.value;
  }
}
