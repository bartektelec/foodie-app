import Component from "../core/Component.js";

const footer = new Component("div", { class: "navbar bg-light flex-column" }, [
  new Component(
    "p",
    { class: "footer-text" },
    "This app has been coded for noroffs osl feu2 javascript 2 course assignment"
  ),
  new Component(
    "a",
    { class: "footer-text", attr: ["href", "https://github.com/bartektelec"] },
    "Made by Bartlomiej Telec, Click here to visit my GitHub"
  ),
  new Component(
    "p",
    { class: "footer-text" },
    "I got my assets from these open-source / CC0 sources: "
  ),
  new Component(
    "ul",
    { class: "footer-text list-group list-group-horizontal" },
    [
      new Component("li", { class: "list-group-item" }, [
        new Component(
          "a",
          { attr: ["href", "https://getbootstrap.com/"] },
          "Bootstrap v4.5"
        ),
      ]),
      new Component("li", { class: "list-group-item" }, [
        new Component(
          "a",
          { attr: ["href", "https://www.pexels.com/"] },
          "Pexels.com"
        ),
      ]),
      new Component("li", { class: "list-group-item" }, [
        new Component(
          "a",
          { attr: ["href", "https://akveo.github.io/eva-icons/#/"] },
          "Eva Icons v1.1.3"
        ),
      ]),
    ]
  ),
]);

export default footer;
