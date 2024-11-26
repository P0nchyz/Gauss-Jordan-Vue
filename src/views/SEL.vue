<script setup>
import { runSEL } from '../../public/gauss_runner';
import { reactive, ref } from 'vue';
import InputLinearMatrix from '@/components/InputLinearMatrix.vue';
import { fileToMatrix, processInputMatrix, validateMatrix } from '@/main';
import LinearMatrix from '@/components/LinearMatrix.vue';

// Define state for the drop file overlay
const active = ref(false);
// Define default matrix
const matrixToOperate = reactive({
	width: 3,
	height: 3,
	e: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
	a: [0, 0, 0]
});
// Change the state of the drop file overlay
function toggleActive() {
	active.value = !active.value;
}
// Update matrix value when changed inside the component
function updateMatrix(e) {
	matrixToOperate.width = e.width;
	matrixToOperate.height = e.height;
	matrixToOperate.e = e.e;
	matrixToOperate.a = e.a;
}
// Recieve a .txt file containing a matrix and put it in the matrix objecy
function handleDrop(e) {
	// Changes the overlay when you drop the file
	toggleActive();
	// Obtain the first file in the dataTransfer array
	const file = e.dataTransfer.files[0];
	// Checks if the file is a .txt
	if (file && file.type === "text/plain") {
		// Decodes the file to matrix object
		fileToMatrix(file, (matrixOut) => {
			matrixToOperate.width = matrixOut.width;
			matrixToOperate.height = matrixOut.height;
			matrixToOperate.e = matrixOut.e;
		});
	} else {
		alert("Please Drop a Valid .txt File.");
	}
}

// Maps all the values in the two-dimensional array of the natrix to undefined
function clearMatrix() {
	matrixToOperate.e = matrixToOperate.e.map(row => row.map(() => undefined));
}
const calcMatrix = reactive({
	width: 3,
	height: 3,
	e: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
	a: [0, 0, 0]
});
let solution = ref(null);
function solutionToText() {
	return solution.value.join(',');
}
function runProgram() {
	processInputMatrix(matrixToOperate);
	if (!validateMatrix(matrixToOperate)) {
		alert("Matriz Incorrecta");
		return;
	}
	let rOb = runSEL(matrixToOperate);
	let rmat = rOb.mat;
	solution.value = rOb.solution;
	calcMatrix.width = rmat.width;
	calcMatrix.height = rmat.height;
	calcMatrix.e = rmat.e;
	calcMatrix.a = rmat.a;
	console.log(calcMatrix);
}
</script>

<template>
	<main class="grow flex flex-col items-center mt-20">
		<div class="self-start">
			<h2 class="text-2xl font-serif font-medium mx-40">Sistema de Ecuaciones Lineales</h2>
		</div>
		<!-- Matrix Input Section -->
		<section @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent=""
			@drop.prevent="handleDrop" class="self-stretch flex flex-col items-center relative">
			<div
				:class="active ? 'absolute w-5/6 h-full bg-red-500/50 outline-8 outline-dashed outline-black flex items-center justify-center' : 'hidden'">
				<p class="text-2xl">Suelte un archivo .txt</p>
			</div>
			<!--<InputMatrix :matrix="matrixToOperate" @matrix-updated="updateMatrix"/>-->
			<InputLinearMatrix :linear-matrix="matrixToOperate" @matrix-updated="updateMatrix" />
			<!-- Action Buttons Section -->
			<div class="self-end mx-40">
				<div>
					<button @click="clearMatrix"
						class="bg-white border-2 border-blue-500 text-black p-2 rounded m-4">Limpiar</button>
					<button @click="runProgram" class="bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 text-white hover:bg-gradient-to-br
						focus:ring-2 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-500/50 p-2 rounded m-4">
						Continuar
					</button>
				</div>
			</div>
		</section>
		<hr class="w-3/4 border-solid border-6 border-black " />
		<!-- Output Matrix Section -->
		<section class="flex flex-col items-center">
			<LinearMatrix :linear-matrix="calcMatrix" />
			<div v-if="solution" class="flex font-bold text-2xl">
				<p>(</p>
				<p>{{ solutionToText() }}</p>
				<p>)</p>
			</div>
		</section>
	</main>
</template>