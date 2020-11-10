import Component from "../core/Component.js";
import { navigateTo } from "../app.js";
import { cart } from "../models/index.js";

const cartItem = (item, renderFunc) => {
  return new Component("div", { class: "card" }, [
    new Component(
      "div",
      {
        class: "card-body",
      },
      [
        new Component("h5", { class: "card-title" }, `${item.name}`),
        new Component(
          "div",
          {
            class:
              "card-text d-flex align-items-center justify-content-between",
          },
          [
            new Component("span", null, `$${item.price}`),
            new Component(
              "button",
              {
                class: "btn btn-sm btn-danger",
                on: [
                  "click",
                  () => {
                    cart.remove(item.id);
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
      ]
    ),
  ]);
};

export default cartItem;
