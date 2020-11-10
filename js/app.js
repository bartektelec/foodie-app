import AppInstance from "./core/AppInstance.js";
import Component from "./core/Component.js";
import Reactive from "./core/Reactive.js";
import alert, { hideAlert } from "./components/alert.js";
import spinner from "./components/spinner.js";
import header from "./components/header.js";
import modal from "./components/modal.js";
import footer from "./components/footer.js";
import favbar from "./components/favourites.js";
import cart from "./components/cart.js";
import home from "./views/home.js";
import login from "./views/login.js";
import { jwt } from "./models/index.js";
import menu from "./views/menu.js";

// simple reactive router
const route = Reactive(home);

export const navigateTo = (where, id) => {
  router.wipe();
  hideAlert();
  switch (where) {
    case "home":
      route.value = home;
      break;
    case "login":
      route.value = login(jwt);
      break;
    case "menu":
      route.value = menu(id);
      break;
  }
};
const router = new Component("div", { class: "main container" }).bind(
  "child",
  route
);

new AppInstance("#app", [
  header,
  modal,
  alert,
  spinner,
  favbar,
  cart,
  router,
  footer,
]);
