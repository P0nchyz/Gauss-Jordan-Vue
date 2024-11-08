<script setup>
import Matrix from '@/components/Matrix.vue';
import InputMatrix from '@/components/InputMatrix.vue';
import { runInverse } from '../../public/gauss_runner';
import { reactive, ref } from 'vue';
// Define default matrix
const matrixToOperate = reactive({
	width: 3,
	height: 3,
	e: [[1,0,0],[0,1,0],[0,0,1]]
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
const calcMatrix = reactive({
	width: 3,
	height: 3,
	e: [[1,0,0],[0,1,0],[0,0,1]]
});
function runProgram() {
	if (matrixToOperate.width === matrixToOperate.height){
		let rMatrix = runInverse(matrixToOperate);
		calcMatrix.width = rMatrix.width;
		calcMatrix.height = rMatrix.height;
		calcMatrix.e = rMatrix.e;
		console.log(calcMatrix);
	} else {
		alert("Matriz no Cuadrada");
	}
}
</script>

<template>
	<main class="grow flex flex-col items-center">
		<!-- Matrix Input Section -->
		<section class="self-stretch flex flex-col items-center relative" >
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
		<section>
			<Matrix :matrix="calcMatrix"/>
		</section>
	</main>
</template>