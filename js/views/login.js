import { API_URL } from "../vars.js";
import { setSpinner } from "../components/spinner.js";
import { addAlert } from "../components/alert.js";
import Component from "../core/Component.js";
import { navigateTo } from "../app.js";

let data = [];

const getUserData = async (jwt) => {
  setSpinner(true);
  const token = jwt.get();
  try {
    const req = await fetch(API_URL + "/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    data = await req.json();
    generatePage(data);
  } catch (e) {
    setSpinner(false);
    addAlert(`💩 ${e.message}`, "danger");
  }
};

const dashboardWrapper = new Component("div");
const main = new Component("main", null, [
  new Component(
    "a",
    { attr: ["href", "#"], on: ["click", () => navigateTo("home")] },
    "Go back"
  ),
  dashboardWrapper,
]);

const generatePage = (user) => {
  setSpinner(false);
  dashboardWrapper.wipe();
  // const userData = new Component("h1", {}, `Welcome back ${user.username}`);

  dashboardWrapper.child(new Component("h1", {}, `Hello ${user.username}`));
  // dashboardWrapper.child(userData);
};

export default (jwt) => {
  getUserData(jwt);
  return main;
};
