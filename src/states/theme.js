import { map } from 'nanostores';

const themes = ['system', 'dark', 'light'];

/**
 * @type {import('../app.d.js').MapStore<{ theme: string; pref_dark: boolean }>
 * 	| undefined}
 */
let state;

const update_pref_dark = (
	/** @type Window */ w,
	/** @type {(pref: boolean) => void} */ cb,
) => {
	const mql_system_pref = w.matchMedia('(prefers-color-scheme: dark)');
	cb(mql_system_pref.matches);

	mql_system_pref.onchange = (e) => {
		cb(e.matches);
	};

	return () => (mql_system_pref.onchange = null);
};

const get_mb_saved_theme = (/** @type Storage */ local_storage) => {
	try {
		if (!('theme' in local_storage)) return;
		const saved_theme = JSON.parse(local_storage.theme);
		if (!themes.includes(saved_theme)) return;
		return saved_theme;
	} catch {
		// satisfy lint
	}
	return;
};

const init_state = () => {
	return {
		subscribe: state?.subscribe,
		value: () => state?.value.theme,
		pref_dark: () => state?.value.pref_dark,
		true_dark: () =>
			!(state?.value.theme == 'light') && state?.value.pref_dark,
		next: (
			/** @type Storage */ local_storage,
			/** @type Document */ doc_elem,
		) => {
			if (!state) return;
			const nstate = next_theme_state(state.value.theme);
			local_storage.setItem('theme', JSON.stringify(nstate));
			doc_elem.documentElement.dataset.theme = nstate;
			state?.setKey('theme', nstate);
			return nstate;
		},
		init: (
			/** @type Storage */ local_storage,
			/** @type Document */ doc_elem,
			/** @type Window */ w,
		) => {
			if (state) return;
			state = map({
				theme: 'dark',
				pref_dark: /** @type boolean */ (true),
			});

			const pref_unsub = update_pref_dark(w, (val) =>
				state?.setKey('pref_dark', val),
			);
			state.subscribe(() => pref_unsub);
			const saved_theme =
				get_mb_saved_theme(local_storage) ?? state.value.theme;
			state.setKey('theme', saved_theme);
			doc_elem.documentElement.dataset.theme = saved_theme;
		},
		refresh: (/** @type Document */ doc_elem) => {
			if (!state) return;
			doc_elem.documentElement.dataset.theme = state.value.theme;
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
		: '';
