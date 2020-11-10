import { API_URL } from "../vars.js";
import { setSpinner } from "../components/spinner.js";
import { addAlert } from "../components/alert.js";
import mealElement from "../components/meal.js";
import Component from "../core/Component.js";
import { navigateTo } from "../app.js";

let data = [];

const getRestaurantData = async (id) => {
  setSpinner(true);
  try {
    const req = await fetch(API_URL + "/restaurants/" + id);
    data = await req.json();
    generatePage(data);
  } catch (e) {
    setSpinner(false);
    addAlert(`💩 ${e.message}`, "danger");
  }
};

const restaurantWrapper = new Component("div");
const main = new Component("main", null, [
  new Component(
    "a",
    { attr: ["href", "#"], on: ["click", () => navigateTo("home")] },
    "Go back"
  ),
  restaurantWrapper,
]);

const generatePage = (restaurant) => {
  setSpinner(false);
  restaurantWrapper.wipe();
  const mealList = new Component("ul", { class: "list-group" });
  if (restaurant.meals) {
    restaurant.meals.forEach((meal) => {
      const listItem = mealElement(meal);
      mealList.child(listItem);
    });
  }

  restaurantWrapper.child(new Component("h1", {}, restaurant.name));
  restaurantWrapper.child(mealList);
};

export default (restaurantid) => {
  getRestaurantData(restaurantid);
  return main;
};
