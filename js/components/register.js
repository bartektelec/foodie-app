import Component from "../core/Component.js";
import { toggleModal } from "./modal.js";

const register = new Component("div", { class: "card modal-card" }, [
  new Component("div", { class: "card-header" }, "Create new user"),
  new Component("div", { class: "card-body" }, [
    new Component("div", { class: "form-group" }, [
      new Component("label", {}, "Username"),
      new Component("input", { class: "form-control" }).attr("type", "text"),
    ]),
    new Component("div", { class: "form-group" }, [
      new Component("label", {}, "E-mail"),
      new Component("input", { class: "form-control" }).attr("type", "email"),
    ]),
    new Component("div", { class: "form-group" }, [
      new Component("label", {}, "Password"),
      new Component("input", { class: "form-control" }).attr(
        "type",
        "password"
      ),
    ]),
    new Component("div", { class: "form-group" }, [
      new Component("label", {}, "Repeat password"),
      new Component("input", { class: "form-control" }).attr(
        "type",
        "password"
      ),
    ]),
    new Component(
      "a",
      { attr: ["href", "#"], on: ["click", () => toggleModal("login")] },
      "Already registered? Log in"
    ),
  ]),
  new Component("div", { class: "card-footer" }, [
    new Component(
      "button",
      { class: "btn btn-outline-danger" },
      "Close"
    ).on("click", () => toggleModal()),
    new Component("button", { class: "btn btn-primary" }, "Register"),
  ]),
]);

export default register;
