<script setup>
import InputMatrix from '@/components/InputMatrix.vue';
import { runDeterminant } from '../../public/gauss_runner';
import { reactive, ref } from 'vue';

// Define state for the drop file overlay
const active = ref(false);
// Define default matrix
const matrixToOperate = reactive({
	width: 3,
	height: 3,
	e: [[1,0,0],[0,1,0],[0,0,1]]
});
// Change the state of the drop file overlay
function toggleActive(){
	active.value = !active.value;
}
// Update matrix value when changed inside the component
function updateMatrix(e) {
	matrixToOperate.width = e.width;
	matrixToOperate.height = e.height;
	matrixToOperate.e = e.e;
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
		fileToMatrix(file, (matrixOut) =>{
			matrixToOperate.width = matrixOut.width;
			matrixToOperate.height = matrixOut.height;
			matrixToOperate.e = matrixOut.e;
		});
	} else {
		alert("Please Drop a Valid .txt File.");
	}
}
function fileToMatrix(file, callback) {
	const reader = new FileReader();
	reader.onload = () => {
		// Contains the raw text inside the file
		const text = reader.result;
		// Contains a two-dimensional array with the elements of the matrix inside
		const elements = text.trim().split("\n").map(row => row.split(" ").map(value => Number(value.trim())));
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
// Maps all the values in the two-dimensional array of the natrix to undefined
function clearMatrix() {
	matrixToOperate.e = matrixToOperate.e.map(row => row.map(() => undefined));
}
const determinante = ref(1);
function runProgram() {
	if (matrixToOperate.width === matrixToOperate.height){
		determinante.value = runDeterminant(matrixToOperate);
	} else {
		alert("Matriz no Cuadrada");
	}
}
</script>

<template>
	<main class="grow flex flex-col items-center">
		<!-- Matrix Input Section -->
		<section
		@dragenter.prevent="toggleActive"
		@dragleave.prevent="toggleActive"
		@dragover.prevent=""
		@drop.prevent="handleDrop"
		class="self-stretch flex flex-col items-center relative" >
			<div :class="active ? 'absolute w-5/6 h-full bg-red-500/50 outline-8 outline-dashed outline-black flex items-center justify-center' : 'hidden' ">
				<p class="text-2xl">Suelte un archivo .txt</p>
			</div>

			<InputMatrix :matrix="matrixToOperate" @matrix-updated="updateMatrix"/>
			<!-- Action Buttons Section -->
			<div class="self-end mx-40">
				<div>
					<button @click="clearMatrix" class="bg-white border-2 border-blue-500 text-black p-2 rounded m-4">Limpiar</button>
					<button @click="runProgram" class="bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 text-white hover:bg-gradient-to-br
						focus:ring-2 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-500/50 p-2 rounded m-4">
						Continuar
					</button>
				</div>
			</div>
		</section>
		<hr class="w-3/4 border-solid border-6 border-black "/>
		<!-- Output Matrix Section -->
		<section class="flex items-center p-4">
			<h1 class="mx-4 text-xl text-blue-900 font-bold">El Valor de la Determinante es: </h1>
			<h2 class="text-2xl underline text-red-600 font-extrabold">{{ determinante }}</h2>
		</section>
	</main>
</template>