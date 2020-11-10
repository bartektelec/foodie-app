export default class localStorageHandler {
  constructor(key, alertHandler) {
    this.key = key;
    this.alertHandler = alertHandler;
  }

  get() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  isSet() {
    const value = this.get();
    if (JSON.stringify(value) !== JSON.stringify([])) {
      return true;
    }
    return false;
  }

  set(value) {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  add(value) {
    const currentValue = this.get();
    currentValue.push(value);
    this.set(currentValue);
    this.alertHandler(`👌 ${value.name} added to ${this.key}`);
  }

  addOnce(value) {
    const currentValue = this.get();
    if (currentValue.some((item) => item.id === value.id)) {
      return this.alertHandler(
        `🙈 ${value.name} has already been added before`
      );
    }
    currentValue.push(value);
    this.set(currentValue);
    this.alertHandler(`👌 ${value.name} added to ${this.key}`, "success");
  }

  remove(id) {
    const currentValue = this.get();
    if (!currentValue.some((item) => item.id === id)) {
      return this.alertHandler("😱 Item is not stored in " + this.key);
    }
    const newValue = currentValue.filter((meal) => meal.id !== id);
    this.set(newValue);
    this.alertHandler(`👌 Item removed from ${this.key}`, "success");
  }

  wipe() {
    this.clear();
    this.alertHandler(`👌 List cleared`, "success");
  }
  clear() {
    localStorage.removeItem(this.key);
  }
}
