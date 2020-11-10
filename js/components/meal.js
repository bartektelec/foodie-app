import Component from "../core/Component.js";
import { IMG_URL } from "../vars.js";
import { cart } from "../models/index.js";
export default function (meal) {
  return new Component(
    "li",
    { class: "list-group-item list-group-item-action d-flex" },
    [
      new Component("div", { class: "meal-thumbnail" }, [
        new Component("img", {
          class: "img-thumbnail meal-img",
          attr: ["src", IMG_URL + meal.image],
        }).attr("alt", `Picture of ${meal.name}`),
      ]),
      new Component(
        "div",
        {
          class: "meal-main",
        },
        [
          new Component("div", null, [
            new Component("h5", {}, meal.name),
            new Component("p", {}, meal.description),
          ]),
          new Component("div", null, [
            new Component("h2", null, `${meal.price} NOK`),
            new Component(
              "button",
              {
                class: "btn btn-primary",
                on: ["click", () => cart.addOnce(meal)],
              },
              "Add to cart"
            ),
          ]),
        ]
      ),
    ]
  );
}
