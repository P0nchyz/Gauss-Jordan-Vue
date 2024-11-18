import { returnState } from "../src/main";

function matrixToString(matrix) {
	let rString = matrix.e.map((row) => row.join(" ")).join("\n");
	return rString;
}

function parseMatrix(stringMatrix) {
	let matrixContent = stringMatrix.match(/<([\s\S]*)>/);
	if (!matrixContent) {
		return undefined;
	}
	let re = matrixContent[1]
		.trim()
		.split("\n")
		.map((row) => row.trim().split(" ").map(Number));
	let rMatrix = {
		height: re.length,
		width: re[0].length,
		e: re,
	};
	return rMatrix;
}

function parseAugMatrix(stringAugMatrix) {
	let matrixContent = stringAugMatrix.match(/<([^|]+)\|([^>]+)>/);
	// let lMatrix = matrixContent[1].trim().split(" ").map(Number);
	let lMatrix = matrixContent[1]
		.trim()
		.split("\n")
		.map((row) => row.trim().split(" ").map(Number));
	// let rMatrix = matrixContent[2].trim().split(" ").map(Number);
	let rMatrix = matrixContent[2]
		.trim()
		.split("\n")
		.map((row) => row.trim().split(" ").map(Number));
	let retMatrix = {
		height: lMatrix.length,
		lwidth: lMatrix[0].length,
		rwidth: rMatrix[0].length,
		e: lMatrix,
		a: rMatrix,
	};
	return retMatrix;
}

// Input a matrix object and returns a matrix object
// TODO: Handle when matrix is not inversible
function runInverse(matrix) {
	const inputString =
		"i\n" +
		matrix.height +
		"\n" +
		matrix.width +
		"\n" +
		matrixToString(matrix);
	const inputStringArray = inputString.split("");
	let output;
	Module.preRun = [
		() => {
			FS.init(
				() => {
					if (inputStringArray.length > 0) {
						return inputStringArray.shift().charCodeAt(0);
					} else {
						return null;
					}
				},
				(char) => {
					output += String.fromCharCode(char);
				}
			);
		},
	];
	run();
	document.getElementById("gauss_jordan_script").remove();
	returnState();
	let script = document.createElement("script");
	script.id = "gauss_jordan_script";
	script.src = "/Gauss-Jordan-Vue/gauss_jordan.js";
	document.body.appendChild(script);
	console.log(output);
	let retMatrix;
	retMatrix = parseMatrix(output);
	if (retMatrix === undefined) {
		alert("Matriz No Inversible");
	}
	return retMatrix;
}

function runDeterminant(matrix) {
	const inputString =
		"d\n" +
		matrix.height +
		"\n" +
		matrix.width +
		"\n" +
		matrixToString(matrix);
	const inputStringArray = inputString.split("");
	let output;
	Module.preRun = [
		() => {
			FS.init(
				() => {
					if (inputStringArray.length > 0) {
						return inputStringArray.shift().charCodeAt(0);
					} else {
						return null;
					}
				},
				(char) => {
					output += String.fromCharCode(char);
				}
			);
		},
	];
	run();
	document.getElementById("gauss_jordan_script").remove();
	returnState();
	let script = document.createElement("script");
	script.id = "gauss_jordan_script";
	script.src = "/Gauss-Jordan-Vue/gauss_jordan.js";
	document.body.appendChild(script);
	console.log("Sopa");
	console.log(output);
	let match = output.match(/<([-+]?\d*\.?\d+)>/);
	return match ? parseFloat(match[1]) : null;
}

function runSEL(linMatrix) {
	let linMatStr = "";
	for (let i = 0; i < linMatrix.height; i++) {
		const row = linMatrix.e[i].join(" ") + " " + linMatrix.a[i];
		linMatStr += row + "\n";
	}
	const inputString =
		"s\n" + linMatrix.height + "\n" + linMatrix.width + "\n" + linMatStr;
	console.log(inputString);
	const inputStringArray = inputString.split("");
	let output;
	Module.preRun = [
		() => {
			FS.init(
				() => {
					if (inputStringArray.length > 0) {
						return inputStringArray.shift().charCodeAt(0);
					} else {
						return null;
					}
				},
				(char) => {
					output += String.fromCharCode(char);
				}
			);
		},
	];
	run();
	document.getElementById("gauss_jordan_script").remove();
	returnState();
	let script = document.createElement("script");
	script.id = "gauss_jordan_script";
	script.src = "/Gauss-Jordan-Vue/gauss_jordan.js";
	document.body.appendChild(script);
	console.log("Sopa");
	console.log(output);
	let augMat = parseAugMatrix(output);
	let retLinMat = {
		width: augMat.lwidth,
		height: augMat.height,
		e: augMat.e,
		a: augMat.a.flat(),
	};
	let match = output.match(/<\((.*?)\)>/);
	match
		? (match = match[1].split(",").map((num) => parseFloat(num.trim())))
		: (match = null);
	return { mat: retLinMat, solution: match };
}

function runPasoAPaso(augMat, option, data) {
	let augMatStr = "";
	for (let i = 0; i < augMat.height; i++) {
		let row = augMat.lMat.e[i].join(" ") + " " + augMat.rMat.e[i].join(" ");
		augMatStr += row + "\n";
	}
	let inputString = "";
	switch (option) {
		case "+":
			inputString = `p\n${augMat.height}\n${augMat.lMat.width}\n${
				augMat.rMat.width
			}\n${augMatStr}\n1\n${data.Ri + 1}\n${data.k}\n${data.Rj + 1}\n7\n`;
			break;
		case "-":
			inputString = `p\n${augMat.height}\n${augMat.lMat.width}\n${
				augMat.rMat.width
			}\n${augMatStr}\n2\n${data.Ri + 1}\n${data.k}\n${data.Rj + 1}\n7\n`;
			break;
		case "*":
			inputString = `p\n${augMat.height}\n${augMat.lMat.width}\n${
				augMat.rMat.width
			}\n${augMatStr}\n4\n${data.Ri + 1}\n${data.k}\n7\n`;
			break;
		case "/":
			inputString = `p\n${augMat.height}\n${augMat.lMat.width}\n${
				augMat.rMat.width
			}\n${augMatStr}\n3\n${data.Ri + 1}\n${data.k}\n7\n`;
			break;
		case "m":
			inputString = `p\n${augMat.height}\n${augMat.lMat.width}\n${
				augMat.rMat.width
			}\n${augMatStr}\n5\n${data.Ri + 1}\n${data.Rj + 1}\n7\n`;
			break;
		default:
			alert("Chorizo");
			break;
	}
	console.log(inputString);
	const inputStringArray = inputString.split("");
	let output = "";
	Module.preRun = [
		() => {
			FS.init(
				() => {
					if (inputStringArray.length > 0) {
						return inputStringArray.shift().charCodeAt(0);
					} else {
						return null;
					}
				},
				(char) => {
					output += String.fromCharCode(char);
				}
			);
		},
	];
	run();
	document.getElementById("gauss_jordan_script").remove();
	returnState();
	let script = document.createElement("script");
	script.id = "gauss_jordan_script";
	script.src = "/Gauss-Jordan-Vue/gauss_jordan.js";
	document.body.appendChild(script);
	console.log(output);
	let augMatOut = parseAugMatrix(output);
	const retAugMat = {
		height: augMatOut.height,
		width: augMatOut.lwidth + augMatOut.rwidth,
		lMat: {
			height: augMatOut.height,
			width: augMatOut.lwidth,
			e: augMatOut.e,
		},
		rMat: {
			height: augMatOut.height,
			width: augMatOut.rwidth,
			e: augMatOut.a,
		},
	};
	return retAugMat;
}

export { runInverse, runDeterminant, runSEL, runPasoAPaso };
