class Component {
  constructor(htmltag, options, children) {
    this.element = htmltag
      ? document.createElement(htmltag)
      : document.createTextNode(children);
    if (options)
      Object.keys(options).forEach((key) => {
        let passedValue = options[key];
        if (typeof options[key] !== "string") {
          [...passedValue] = options[key];
          return this[key](...passedValue);
        }
        this[key](passedValue);
      });
    if (children) {
      if (typeof children === "string") {
        return this.child(new TextComponent(children));
      }
      children.forEach((child) => {
        child instanceof Component
          ? this.child(child)
          : this.child(new TextComponent(child));
      });
    }
  }

  text(textContent) {
    if (typeof textContent !== "string") textContent.toString();
    this.element.textContent = textContent;
    return this;
  }

  value(newVal) {
    if (typeof newVal !== "string") newVal.toString();
    this.element.value = newVal;
    return this;
  }

  placeholder(text) {
    if (typeof text !== "string") text.toString();
    this.element.setAttribute("placeholder", text);
    return this;
  }

  on(trigger, cb) {
    this.element.addEventListener(trigger, cb);
    return this;
  }

  bind(...args) {
    let action;
    let state;
    if (args.length > 1) {
      [action, state] = args;
    } else {
      action = "text";
      [state] = args;
    }

    state.bind(this, action);
    return this;
  }

  model(reactive) {
    reactive.model(this);
    return this;
  }

  if(conditionOrState, action = "show", value) {
    if (typeof conditionOrState !== "boolean") {
      conditionOrState.bind(this, action, value);
    } else {
      this[action](value);
    }

    return this;
  }

  show(condition) {
    this.element.hidden = !condition;
    return this;
  }

  class(classname) {
    if (!classname) return this;
    const classes = classname.split(" ");
    classes.forEach((item) => {
      if (typeof item !== "string") item.toString();
      this.element.classList.toggle(item);
    });
    return this;
  }

  child(childElement) {
    this.element.append(childElement.render());
    return this;
  }

  attr(key, value) {
    if (typeof key !== "string") key = key.toString();
    if (typeof value !== "string") value = value.toString();

    this.element.setAttribute(key, value);
    return this;
  }

  wipe() {
    this.element.innerHTML = "";
    return this.element;
  }
  render() {
    return this.element;
  }

  mount(selector) {
    document.querySelector(selector).append(this.render());
  }
}

class TextComponent {
  constructor(str) {
    this.element = document.createTextNode(str);
  }

  render() {
    return this.element;
  }
}

export default Component;
