import { atom } from "nanostores";

const themes = ["system", "dark", "light"];
/**
 * Subscribe value on change
 *
 * @function
 * @function
 * @name subscribe
 *
 * Update to the next theme
 * @name next
 */

const state = atom("system");

const init_state = () => {
  return {
    subscribe: state.subscribe,

    next: (
      /** @type Storage */ local_storage,
      /** @type Document */ doc_elem,
    ) => {
      const nstate = next_theme_state(state.value);
      local_storage.setItem("theme", JSON.stringify(nstate));
      doc_elem.documentElement.dataset.theme = nstate;
      state.set(nstate);
      return nstate;
    },
    init: (
      /** @type Storage */ local_storage,
      /** @type Document */ doc_elem,
    ) => {
      if ("theme" in local_storage) {
        const parsedState = JSON.parse(local_storage.theme);
        if (themes.includes(parsedState)) {
          state.set(parsedState);
          doc_elem.documentElement.dataset.theme = parsedState;
        }
      } else {
        doc_elem.documentElement.dataset.theme = state.value;
      }
    },
  };
};

export const theme = init_state();

/**
 * @param {string} state - The current theme
 * @returns {string} Empty if invalid or the next theme
 */
export const next_theme_state = (state) =>
  themes.includes(state)
    ? themes[(themes.indexOf(state) + 1) % themes.length]
    : "";

