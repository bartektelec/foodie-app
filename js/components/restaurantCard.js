import Component from "../core/Component.js";
import { IMG_URL } from "../vars.js";
import { navigateTo } from "../app.js";
import { favs } from "../models/index.js";

const CATEGORY_TO_COLOR = {
  mexican: "danger",
  american: "info",
  streetfood: "dark",
  fastfood: "primary",
  foodtruck: "secondary",
  indian: "warning",
  italian: "warning",
  pizza: "success",
  burger: "danger",
  pasta: "primary",
};

function createBadge(text) {
  return new Component(
    "span",
    {
      class: `badge badge-category badge-${CATEGORY_TO_COLOR[text]} mr-2 mb-2`,
    },
    text
  );
}

export default function restaurantCard(restaurant, searchFn) {
  const { id, name, rating, address, image, categories } = restaurant;
  let savedToFavourites = favs.get();
  let isAlreadyFavourite = savedToFavourites.some((res) => res.name === name);

  const badges = new Component("div", { class: "card-badges" });

  categories.forEach((category) => {
    badges.child(
      createBadge(category.name).on("click", () => searchFn(category.name))
    );
  });

  const likeButton = new Component("div", {
    class: `card-icon card-icon--love`,
    on: [
      "click",
      () => {
        savedToFavourites = favs.get();
        const isAlreadyFavourite = savedToFavourites.some(
          (res) => res.name === name
        );
        if (isAlreadyFavourite) {
          favs.remove(restaurant.id);
        } else {
          favs.addOnce(restaurant);
        }
        likeButton.class("love--filled");
      },
    ],
  });
  if (isAlreadyFavourite) {
    likeButton.class("love--filled");
  }

  return new Component("div", { class: "card card--restaurant" }, [
    new Component("img", { class: "card-img-top" })
      .attr("src", IMG_URL + image)
      .attr("alt", name + " picture"),
    new Component("div", { class: "card-body" }, [
      badges,
      new Component("small", { class: "card-text" }, `rating: ${rating}`),
      new Component("div", { class: "card-title" }, [
        new Component("h5", {}, name),
        likeButton,
      ]),
      new Component("p", { class: "card-text" }, address),
    ]),
    new Component("div", { class: "card-footer" }, [
      new Component(
        "button",
        {
          class: "btn btn-warning",
          on: ["click", () => navigateTo("menu", restaurant.id)],
        },
        "See meals"
      ),
    ]),
  ]);
}
