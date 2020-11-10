// This is a function i called Reactive
// it returns an object that stores a value
// this value can be bound to other Components as classes, textNodes or whatever
// everytime the value is being set, all the bound components
// (only the property bound to this value) will be set using an observer pattern
// it does NOT re-render elements, the bind affects the HTML elements properties in real-time
// EXPERIMENTAL, ONLY USE FOR SIMPLE STUFF

function Reactive(initVal) {
  let state = initVal;
  let bound = [];
  return {
    get value() {
      return state;
    },

    set value(val) {
      state = val;
      bound.forEach(({ target, action, content }) => {
        if (content) {
          const newVal = content || state;
          target[action](newVal || "");
        } else {
          target[action](state);
        }
      });
    },

    bind(target, action = "text", content = null) {
      if (typeof content === "function") content = content();
      target[action](content || state);
      bound.push({ target, action, content });
    },

    model(target) {
      target.on("input", (e) => {
        this.value = e.target.value;
      });

      this.bind(target, "value");
    },

    get bound() {
      return bound;
    },
  };
}

export default Reactive;
