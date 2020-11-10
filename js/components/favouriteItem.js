import Component from "../core/Component.js";
import { navigateTo } from "../app.js";
import { favs } from "../models/index.js";

const favouriteItem = (item, renderFunc) => {
  return new Component("div", { class: "card card-fav" }, [
    new Component(
      "div",
      {
        class: "card-body d-flex align-items-center justify-content-between",
      },
      [
        new Component(
          "span",
          { on: ["click", () => navigateTo("menu", item.id)] },
          item.name
        ),
        new Component(
          "button",
          {
            class: "btn btn-sm btn-danger",
            on: [
              "click",
              () => {
                favs.remove(item.id);
                renderFunc();
              },
            ],
          },
          [
            new Component("img", {
              class: "navbar-icon",
              attr: ["src", "./assets/icons/trash-2-outline.svg"],
            }),
          ]
        ),
      ]
    ),
  ]);
};

export default favouriteItem;
