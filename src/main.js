import './assets/main.css'
import router from './router'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.use(router);

app.mount('#app');

const globalsBefore = new Set(Object.keys(window));

let script = document.createElement("script");
script.src = "/gauss_jordan.js";
script.id = "gauss_jordan_script";
document.body.appendChild(script);

const newGlobals = new Set();

script.onload = () => {
	newGlobals.clear();
	const globalsAfter = new Set(Object.keys(window));
	globalsAfter.forEach((key) => {
		if (!globalsBefore.has(key)) {
			newGlobals.add(key);
		}
	})
}

// Reset all keys added for WASM to undefined
// Long Live Chayipiti
export function returnState() {
	var curGlob = new Set(Object.keys(window));
	newGlobals.forEach((key) => {
		if (curGlob.has(key)) {
			window[key] = undefined;
		}
	})
}