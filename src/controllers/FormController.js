import { FormWrapperController } from "./FormWrapperController.js";

export class FormController {
  constructor() {
    this.wrapperDay = new FormWrapperController(
      "#fwDay",
      "label[for='day']",
      "input#day",
      "span#errDay"
    );

    this.wrapperMonth = new FormWrapperController(
      "#fwMonth",
      "label[for='month']",
      "input#month",
      "span#errMonth"
    );

    this.wrapperYear = new FormWrapperController(
      "#fwYear",
      "label[for='year']",
      "input#year",
      "span#errYear"
    );

    this.cardResultDays = document.querySelector("#cr-days");
    this.cardResultMonths = document.querySelector("#cr-months");
    this.cardResultYears = document.querySelector("#cr-years");

    this.spanButtonSubmit = document.querySelector(".separator-circle");

    this.htmlElement = document.querySelector("form");

    this.attachEvents();
  }

  attachEvents() {
    this.handleSubmit();
    this.handleInputsChange();
  }

  handleSubmit() {
    this.htmlElement.addEventListener("valueInput", () => {
      this.sendSubmit();
    });

    this.spanButtonSubmit.addEventListener("click", () => {
      this.sendSubmit();
    });
  }

  sendSubmit() {
    this.resetFormErrors();
    this.hideHiddenMessage();
    if (!this.isFilledInputs()) return;
    if (!this.isValidYear() || !this.isValidMonth()) return;
    if (!this.isValidDay()) return;
    this.calculateDate();
  }

  handleInputsChange() {
    this.htmlElement.addEventListener("changeInput", (e) => {
      const spanErrorDay = document.querySelector("span#errDay");
      const spanErrorMessage = spanErrorDay.textContent;

      if (spanErrorMessage === "Must be a valid date" && e.detail === "day")
        this.resetFormErrors();
      else {
        if (e.detail === "day") this.wrapperDay.resetErrors();
        if (e.detail === "month") this.wrapperMonth.resetErrors();
        if (e.detail === "year") this.wrapperYear.resetErrors();
      }
    });
  }

  resetFormErrors() {
    this.wrapperDay.resetErrors();
    this.wrapperMonth.resetErrors();
    this.wrapperYear.resetErrors();
  }

  getDayValue() {
    return this.wrapperDay.getInputValue();
  }

  setDayError(message) {
    this.wrapperDay.setError(message);
  }

  getMonthValue() {
    return this.wrapperMonth.getInputValue();
  }

  setMonthError(message) {
    this.wrapperMonth.setError(message);
  }

  getYearValue() {
    return this.wrapperYear.getInputValue();
  }

  setYearError(message) {
    this.wrapperYear.setError(message);
  }

  isFilledInputs() {
    const dayValue = this.getDayValue();
    const monthValue = this.getMonthValue();
    const yearValue = this.getYearValue();

    if (dayValue === "") this.setDayError("This field is required");
    if (monthValue === "") this.setMonthError("This field is required");
    if (yearValue === "") this.setYearError("This field is required");

    return dayValue !== "" && monthValue !== "" && yearValue !== "";
  }

  isValidYear() {
    const yearValue = Number(this.getYearValue());
    const actualYear = new Date().getFullYear();

    const validYear = yearValue <= actualYear;

    if (!validYear) this.setYearError("Must be in the past");

    return validYear;
  }

  isValidMonth() {
    const monthValue = Number(this.getMonthValue());
    const validMonth = monthValue > 0 && monthValue <= 12;

    if (!validMonth) this.setMonthError("Must be a valid month");

    return validMonth;
  }

  isValidDay() {
    const isValid = true;
    const dayMessage = "Must be a valid day";
    const dateMessage = "Must be a valid date";

    const dayValue = Number(this.getDayValue());

    if (dayValue <= 0 || dayValue > 31) {
      this.setDayError(dayMessage);
      return !isValid;
    }

    const monthValue = Number(this.getMonthValue());
    const yearValue = Number(this.getYearValue());

    if (!this.isLeapYearValidDay(dayValue, monthValue, yearValue, dateMessage))
      return !isValid;

    const isThirtyOneMonth =
      monthValue === 1 ||
      monthValue === 3 ||
      monthValue === 5 ||
      monthValue === 7 ||
      monthValue === 8 ||
      monthValue === 10 ||
      monthValue === 12;

    if (
      (isThirtyOneMonth && dayValue > 31) ||
      (!isThirtyOneMonth && dayValue > 30)
    ) {
      this.setErrorInvalidDate(dateMessage);
      return !isValid;
    }

    return isValid;
  }

  isLeapYearValidDay(day, month, year, message) {
    if (month !== 2) return true;

    const leapYear = year % 4 === 0;

    const validDayLeapYear =
      (leapYear && month === 2 && day <= 29) ||
      (!leapYear && month === 2 && day <= 28);

    if (!validDayLeapYear) {
      this.setErrorInvalidDate(message);
    }

    return validDayLeapYear;
  }

  calculateDate() {
    const yearsValue = this.getYearValue();
    const monthsValue = this.getMonthValue();
    const daysValue = this.getDayValue();

    const sDate = `${yearsValue}-${monthsValue}-${daysValue}`;

    if (sDate === "1994-10-20") {
      this.showHiddenMessage();
    }

    const dateCreated = new Date(sDate);
    const actualDate = new Date();

    // Diferencia en milisegundos entre las dos fechas
    const timeDiff = actualDate.getTime() - dateCreated.getTime();

    // Cálculo de la diferencia en años, meses y días
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
    );
    const days = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
    );

    const delay = 400;

    this.animateNum(this.cardResultYears, years, delay);
    this.animateNum(this.cardResultMonths, months, delay);
    this.animateNum(this.cardResultDays, days, delay);
  }

  animateNum(domElement, value, delay) {
    // Extracted from https://github.com/Jo-cloud85/
    for (let i = 0; i <= value; i++) {
      setTimeout(() => {
        domElement.textContent = i;
      }, (delay / value) * i);
    }
  }

  showHiddenMessage() {
    const spanHidden = document.querySelector(".hidden-message");
    spanHidden.classList.add("show");
  }

  hideHiddenMessage() {
    const spanHidden = document.querySelector(".hidden-message");
    spanHidden.classList.remove("show");
  }

  setErrorInvalidDate(message) {
    this.setDayError(message);
    this.wrapperMonth.setLabelError();
    this.wrapperMonth.setInputError();
    this.wrapperYear.setLabelError();
    this.wrapperYear.setInputError();
  }
}
