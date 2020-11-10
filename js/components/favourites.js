import Component from "../core/Component.js";
import favouriteItem from "./favouriteItem.js";
import { favs } from "../models/index.js";

export function toggleFavbar() {
  renderFavList();

  fav.class("sidebar-hidden");
}

const favList = new Component("div");

function renderFavList() {
  const data = favs.get();
  favList.wipe();
  if (!data || !data.length) {
    return favList.child(
      new Component(
        "div",
        { class: "alert alert-danger" },
        "🤠 You have no favourites"
      )
    );
  }
  data.forEach((restaurant) => {
    favList.child(favouriteItem(restaurant, renderFavList));
  });
  favList.child(
    new Component(
      "button",
      {
        class: "btn btn-sm btn-block btn-warning",
        on: [
          "click",
          () => {
            favs.wipe();
            renderFavList();
            toggleFavbar();
          },
        ],
      },
      "Clear favourites"
    )
  );
}
renderFavList();

const fav = new Component("div", { class: "sidebar-bar sidebar-hidden" }, [
  new Component(
    "button",
    {
      class: "btn btn-light d-flex align-items-center",
      on: ["click", toggleFavbar],
    },
    [
      new Component("span", { class: "navbar-item" }, "Hide"),
      new Component("img", {
        class: "card-icon",
        attr: ["src", "./assets/icons/arrow-ios-forward-outline.svg"],
      }),
    ]
  ),
  new Component("h4", { class: "m-2 text-white" }, "Your favourite places"),
  favList,
]);

export default fav;
