import Component from "./Component.js";
class AppInstance {
  constructor(selector, children) {
    this.element = document.querySelector(selector);
    if (children) {
      children.forEach((child) => {
        child instanceof Component
          ? this.child(child)
          : this.child(new TextComponent(child));
      });
    }
  }

  child(childElement) {
    this.element.append(childElement.render());
    return this;
  }

  wipe() {
    this.element.innerHTML = "";
  }
}

export default AppInstance;
