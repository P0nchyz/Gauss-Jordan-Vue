import "./assets/main.css";
import router from "./router";

import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.use(router);

app.mount("#app");

const globalsBefore = new Set(Object.keys(window));

let script = document.createElement("script");
script.src = "/Gauss-Jordan-Vue/gauss_jordan.js";
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
	});
};

// Reset all keys added for WASM to undefined
// Long Live Chayipiti
function returnState() {
	var curGlob = new Set(Object.keys(window));
	newGlobals.forEach((key) => {
		if (curGlob.has(key)) {
			window[key] = undefined;
		}
	});
}

function fileToMatrix(file, callback) {
	const reader = new FileReader();
	reader.onload = () => {
		// Contains the raw text inside the file
		const text = reader.result;
		// Contains a two-dimensional array with the elements of the matrix inside
		const elements = text
			.trim()
			.split("\n")
			.map((row) =>
				row
					.trim()
					.split(" ")
					.map((value) => Number(value.trim()))
			);
		// Uses the number of arrays to calculate the height of the matrix
		const height = elements.length;
		// Searches all the rows to find the longest one ans returns its length
		const width = elements.reduce(
			(maxLength, currentRow) => Math.max(maxLength, currentRow.length),
			0
		);
		// Asing all the values found to a matrix object
		const matrix = {
			width: width,
			height: height,
			e: elements,
		};
		console.log(matrix);
		// Aplies the function passed as a parameter to the result matrix
		callback(matrix);
	};
	// Specifie how to read the file
	reader.readAsText(file);
}

function toFraction(decimal, tolerance = 1e-6) {
	let numerator = 1;
	let denominator = 1;
	let fraction = numerator / denominator;

	// Loop until the fraction is close enough to the decimal
	while (Math.abs(fraction - decimal) > tolerance) {
		if (fraction < decimal) {
			numerator++;
		} else {
			denominator++;
			numerator = Math.round(decimal * denominator);
		}
		fraction = numerator / denominator;
	}

	return {numerator, denominator};
}

export { returnState, fileToMatrix, toFraction };
