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
					.map((value) =>
						/^[0-9+\-*/%() ]+$/.test(value) ? eval(value) : NaN
					)
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

function toFraction(decimal, tolerance = 1e-4) {
	const isNegative = decimal < 0;
	decimal = Math.abs(decimal);
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

	return !isNegative
		? { numerator, denominator }
		: { numerator: -numerator, denominator };
}

function validateMatrix(matrix) {
	if (
		typeof matrix.width !== "number" ||
		typeof matrix.height !== "number" ||
		!Array.isArray(matrix.e)
	) {
		console.warn("Incorrect matrix property types.");
		return false;
	}
	for (let row of matrix.e) {
		if (!Array.isArray(row) || row.length !== matrix.width) {
			console.warn("Not inner Array");
			return false;
		}

		for (let element of row) {
			if (typeof element !== "number" || isNaN(element)) {
				console.warn(element + typeof element);
				console.warn("Incorrect Element");
				return false;
			}
		}
	}
	return true;
}

function validateAugMatrix(augMatrix) {
	if (
		typeof augMatrix.width !== "number" ||
		typeof augMatrix.height !== "number" ||
		typeof augMatrix.lMat.width !== "number" ||
		typeof augMatrix.lMat.height !== "number" ||
		!Array.isArray(augMatrix.lMat.e) ||
		typeof augMatrix.rMat.width !== "number" ||
		typeof augMatrix.rMat.height !== "number" ||
		!Array.isArray(augMatrix.rMat.e) ||
		augMatrix.height !== augMatrix.lMat.height ||
		augMatrix.height !== augMatrix.rMat.height ||
		augMatrix.width !== augMatrix.lMat.width + augMatrix.rMat.width
	) {
		console.warn("Incorrect Matrix Property");
		return false;
	}
	for (let row of augMatrix.lMat.e) {
		if (!Array.isArray(row) || row.length !== augMatrix.lMat.width) {
			console.warn("Not Inner Array");
			return false;
		}
		for (let element of row) {
			if (typeof element !== "number" || isNaN(element)) {
				console.warn(element + typeof element);
				console.warn("Incorrect element");
				return false;
			}
		}
	}
	for (let row of augMatrix.rMat.e) {
		if (!Array.isArray(row) || row.length !== augMatrix.rMat.width) {
			console.warn("Not Inner Array");
			return false;
		}
		for (let element of row) {
			if (typeof element !== "number" || isNaN(element)) {
				console.warn(element + typeof element);
				console.warn("Incorrect element");
				return false;
			}
		}
	}
	return true;
}

function processInputMatrix(matrix) {
	for (let i = 0; i < matrix.height; i++) {
		for (let j = 0; j < matrix.width; j++) {
			const value = matrix.e[i][j];
			if (value === "") {
				matrix.e[i][j] = undefined;
			} else {
				matrix.e[i][j] = Number(value);
			}
		}
	}
}
function processAugInputMatrix(matrix) {
	for (let i = 0; i < matrix.lMat.height; i++) {
		for (let j = 0; j < matrix.lMat.width; j++) {
			const value = matrix.lMat.e[i][j];
			if (value === "") {
				matrix.lMat.e[i][j] = undefined;
			} else {
				matrix.lMat.e[i][j] = Number(value);
			}
		}
	}
	for (let i = 0; i < matrix.rMat.height; i++) {
		for (let j = 0; j < matrix.rMat.width; j++) {
			const value = matrix.rMat.e[i][j];
			if (value === "") {
				matrix.rMat.e[i][j] = undefined;
			} else {
				matrix.rMat.e[i][j] = Number(value);
			}
		}
	}
}

export {
	returnState,
	fileToMatrix,
	toFraction,
	validateMatrix,
	validateAugMatrix,
	processInputMatrix,
	processAugInputMatrix
};
