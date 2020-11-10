import Component from "../core/Component.js";
import Reactive from "../core/Reactive.js";

const isLoading = Reactive(true);

export function setSpinner(bool) {
  isLoading.value = bool;
}

const spinner = new Component(
  "div",
  {
    class: "spinner-wrapper",
  },
  [
    new Component("p", {}, "Loading..."),
    new Component("div", { class: "spinner-border text-primary" }),
  ]
).if(isLoading);

export default spinner;
