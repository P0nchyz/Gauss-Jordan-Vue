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
function returnState() {
	var curGlob = new Set(Object.keys(window));
	newGlobals.forEach((key) => {
		if (curGlob.has(key)) {
			window[key] = undefined;
		}
	})
}

function fileToMatrix(file, callback) {
	const reader = new FileReader();
	reader.onload = () => {
		// Contains the raw text inside the file
		const text = reader.result;
		// Contains a two-dimensional array with the elements of the matrix inside
		const elements = text.trim().split("\n").map(row => row.trim().split(" ").map(value => Number(value.trim())));
		// Uses the number of arrays to calculate the height of the matrix
		const height = elements.length;
		// uses the number of elements inside the first array to calculate the width
		const width = elements[0]?.length || 0;
		// Asing all the values found to a matrix object
		const matrix = {
			width: width,
			height: height,
			e: elements
		};
		// Aplies the function passed as a parameter to the result matrix
		callback(matrix);
	}
	// Specifie how to read the file
	reader.readAsText(file);
}
export { returnState, fileToMatrix }