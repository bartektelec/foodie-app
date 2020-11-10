import Component from "../core/Component.js";
import restaurantCard from "../components/restaurantCard.js";
import { setSpinner } from "../components/spinner.js";
import { API_URL } from "../vars.js";
import { addAlert, hideAlert } from "../components/alert.js";

let data = [];
const cardWrapper = new Component("div", { class: "home-grid" });
const input = new Component("input", {
  class: "form-control w-50 my-4",
  on: ["input", (e) => handleSearch(e)],
  attr: ["type", "search"],
  placeholder: "Search for name, address or food type",
});

const fetchRestaurants = async () => {
  try {
    setSpinner(true);
    const req = await fetch(API_URL + "/restaurants");
    data = await req.json();
    renderResults(data);
  } catch (e) {
    setSpinner(false);
    addAlert(`💩 ${e}`, "danger");
  }
};
fetchRestaurants();

const renderResults = (results) => {
  setSpinner(false);
  cardWrapper.wipe();
  if (!results.length) {
    return addAlert("✋ Sorry, no matching items found", "danger");
  }
  if (results.length !== data.length) {
    addAlert(
      `👀 Showing ${results.length} of ${data.length} results`,
      "success"
    );
  } else {
    hideAlert();
  }
  addCards(results);
};

const addCards = (restaurants) => {
  restaurants.forEach((restaurant) => {
    cardWrapper.child(restaurantCard(restaurant, searchQuery));
  });
};

function searchQuery(value) {
  input.value(value);
  if (!value.length) return renderResults(data);
  if (value.length < 3) return;

  const inputRegex = new RegExp(value, "gi");
  const filteredResults = data.filter((restaurant) => {
    return (
      inputRegex.test(restaurant.name) ||
      inputRegex.test(restaurant.address) ||
      restaurant.categories.some((category) => inputRegex.test(category.name))
    );
  });

  if (filteredResults.length !== data.length) {
    renderResults(filteredResults);
  }
}

function handleSearch(e) {
  e.preventDefault();

  searchQuery(e.target.value);
}

export default new Component("main", null, [
  new Component("h1", {}, "Restaurants"),
  new Component("form", { on: ["submit", (e) => e.preventDefault()] }, [input]),
  cardWrapper,
]);
