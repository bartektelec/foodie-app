import Component from "../core/Component.js";
import Reactive from "../core/Reactive.js";
import login from "./login.js";
import register from "./register.js";

const modalContent = Reactive(login);
const isModalOpen = Reactive(false);

export const toggleModal = (type) => {
  if (type) {
    modal.wipe();
    if (type === "login") {
      modalContent.value = login;
    } else if (type === "register") {
      modalContent.value = register;
    }
    return (isModalOpen.value = true);
  }
  isModalOpen.value = !isModalOpen.value;
};

const modal = new Component("div", { class: "overlay" })
  .bind("child", modalContent)
  .bind("show", isModalOpen)
  .on("click", (e) => {
    if (e.target.className === "overlay") {
      toggleModal();
    }
  });

export default modal;
