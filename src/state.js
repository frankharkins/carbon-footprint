import { writable } from "svelte/store";

let APP_STATES = ["home", "travel", "diet", "raw", "play"];

export const appState = writable(APP_STATES[0]);

appState.subscribe((state) => {
  if (state === "play") {
    window.showPopup("comparison");
  }
});

export function nextAppState() {
  appState.update((state) => APP_STATES[APP_STATES.indexOf(state) + 1]);
}
