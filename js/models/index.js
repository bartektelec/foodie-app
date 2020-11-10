import localStorageHandler from "../core/localStorage.js";
import { addAlert } from "../components/alert.js";

export const cart = new localStorageHandler("cart", addAlert);
export const favs = new localStorageHandler("favourites", addAlert);
export const jwt = new localStorageHandler("jwt", addAlert);
