import Component from "../core/Component.js";
import Reactive from "../core/Reactive.js";
import { toggleFavbar } from "./favourites.js";
import { toggleCart } from "./cart.js";
import { navigateTo } from "../app.js";
import { toggleModal } from "./modal.js";
import { isLoggedIn } from "./login.js";
import { jwt } from "../models/index.js";

const header = new Component("nav", { class: "navbar navbar-dark bg-dark" }, [
  new Component("a", {
    text: "foodie",
    class: "navbar-brand navbar-brand--foodie",
    attr: ["href", "index.html"],
    on: ["click", () => navigateTo("home")],
  }),
  new Component("div", { class: "navbar-nav flex-row" }, [
    new Component("a", { class: "nav-link", attr: ["href", "#"] }, [
      new Component("img", {
        class: "navbar-icon",
        attr: ["src", "./assets/icons/heart.svg"],
        on: ["click", toggleFavbar],
      }),
    ]),
    new Component("a", { class: "nav-link", attr: ["href", "#"] }, [
      new Component("img", {
        class: "navbar-icon",
        attr: ["src", "./assets/icons/shopping-cart-outline.svg"],
        on: ["click", toggleCart],
      }),
    ]),
    new Component(
      "a",
      {
        class: "btn btn-success",
        attr: ["href", "#"],
        on: ["click", () => toggleModal("login")],
      },
      "Log in"
    ).if(isLoggedIn, "show", () => isLoggedIn),
  ]),
]);

export default header;
