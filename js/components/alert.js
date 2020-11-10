import Component from "../core/Component.js";
const alert = new Component("div");

export const addAlert = (text, type = "danger") => {
  alert.wipe();
  alert.child(
    new Component("div", { class: `alert alert-${type} alert-shake` }, text)
  );
};

export const hideAlert = () => {
  alert.wipe();
};

export default new Component("div", { class: "container alert-container" }, [
  alert,
]);
