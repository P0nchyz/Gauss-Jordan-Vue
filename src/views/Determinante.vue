<script setup>
import InputMatrix from '@/components/InputMatrix.vue';
import { runDeterminant } from '../../public/gauss_runner';
import { reactive, ref } from 'vue';
import { processInputMatrix, validateMatrix } from '@/main';

// Define default matrix
const matrixToOperate = reactive({
	width: 3,
	height: 3,
	e: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
});
// Update matrix value when changed inside the component
function updateMatrix(e) {
	matrixToOperate.width = e.width;
	matrixToOperate.height = e.height;
	matrixToOperate.e = e.e;
}
// Maps all the values in the two-dimensional array of the natrix to undefined
function clearMatrix() {
	matrixToOperate.e = matrixToOperate.e.map(row => row.map(() => undefined));
}
const determinante = ref(1);
function runProgram() {
	processInputMatrix(matrixToOperate);
	if (!validateMatrix(matrixToOperate)) {
		alert("Matriz Incorrecta");
		return;
	}
	if (matrixToOperate.width === matrixToOperate.height) {
		determinante.value = runDeterminant(matrixToOperate);
	} else {
		alert("Matriz no Cuadrada");
	}
}
</script>

<template>
	<main class="grow flex flex-col items-center mt-20">
		<div class="self-start">
			<h2 class="text-2xl font-serif font-medium mx-40">Determinante</h2>
		</div>
		<!-- Matrix Input Section -->
		<section class="self-stretch flex flex-col items-center relative">
			<InputMatrix :matrix="matrixToOperate" @matrix-updated="updateMatrix" />
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
		<section class="flex items-center p-4">
			<h1 class="mx-4 text-xl text-blue-900 font-bold">El Valor de la Determinante es: </h1>
			<h2 class="text-2xl underline text-red-600 font-extrabold">{{ determinante }}</h2>
		</section>
	</main>
</template>