import Component from "../core/Component.js";
import cartItem from "./cartItem.js";
import { addAlert } from "./alert.js";
import { cart } from "../models/index.js";

export function toggleCart() {
  renderCartElement();
  wrapper.class("sidebar-hidden");
}

const cartElement = new Component("div");

function renderCartElement() {
  const data = cart.get();
  cartElement.wipe();
  if (!data || !data.length) {
    return cartElement.child(
      new Component(
        "div",
        { class: "alert alert-danger" },
        "🍕 Your cart is empty"
      )
    );
  }
  let totalPrice = 0;
  data.forEach((meal) => {
    cartElement.child(cartItem(meal, renderCartElement));
    totalPrice += meal.price;
  });
  cartElement.child(
    new Component(
      "button",
      {
        class: "btn btn-sm btn-block btn-warning",
        on: [
          "click",
          () => {
            cart.wipe();
            renderCartElement();
            toggleCart();
          },
        ],
      },
      "Clear cart"
    )
  );
  cartElement.child(
    new Component(
      "p",
      { class: "my-2 text-white" },
      `Total price: $${totalPrice.toFixed(2)}`
    )
  );
  cartElement.child(
    new Component(
      "button",
      {
        class: "btn btn-success btn-block",
        on: [
          "click",
          () => {
            cart.wipe();
            renderCartElement();
            toggleCart();
            addAlert(
              "🤩 Your food will arrive soon! Just kidding this is not a real app 😎",
              "success"
            );
          },
        ],
      },
      "Checkout"
    )
  );
}
renderCartElement();

const wrapper = new Component(
  "div",
  { class: "sidebar-bar sidebar-cart sidebar-hidden" },
  [
    new Component(
      "button",
      {
        class: "btn btn-light d-flex align-items-center",
        on: ["click", toggleCart],
      },
      [
        new Component("span", { class: "navbar-item" }, "Hide"),
        new Component("img", {
          class: "card-icon",
          attr: ["src", "./assets/icons/arrow-ios-forward-outline.svg"],
        }),
      ]
    ),
    new Component("h4", { class: "m-2 text-white" }, "Shopping cart"),
    cartElement,
  ]
);

export default wrapper;
