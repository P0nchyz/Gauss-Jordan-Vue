<script setup>
import { fileToMatrix, processInputMatrix, validateMatrix } from '@/main';
import { reactive, ref, watch } from 'vue';
const emit = defineEmits(['matrixUpdated'])
// Define Default Matrix to be Passsed as Prop
const props = defineProps({
	matrix: {
		type: Object,
		default() {
			return {
				height: 3,
				width: 3,
				e: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
			}
		}
	}
});
// Initialize the value of the matrix as the matrix passed as prop
const matrix = reactive(props.matrix);
// Adds a new row with undefined values
function addRow() {
	matrix.e.push(new Array(matrix.width).fill(undefined));
	matrix.height++;
}
function delRow() {
	if (matrix.height === 1) {
		return;
	}
	matrix.e.pop();
	matrix.height--;
}
// Adds a new column with undefined values
function addCol() {
	matrix.e.forEach(row => row.push(undefined));
	matrix.width++;
}
function delCol() {
	if (matrix.width === 1) {
		return;
	}
	matrix.e.forEach(row => row.pop());
	matrix.width--;
}
// TO-DO: Implement use of value change
function onWidthChange() {
	alert("no")
}
function onHeightChange() {
	alert("no")
}

const dropActive = ref(false);
function toggleActive() {
	dropActive.value = !dropActive.value;
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
		fileToMatrix(file, (fileMatrix) => {
			matrix.width = fileMatrix.width;
			matrix.height = fileMatrix.height;
			matrix.e = fileMatrix.e;
			processInputMatrix(matrix);
			if (!validateMatrix(matrix)) {
				alert("Matriz Incorrecta");
				return;
			}
		});
	} else {
		alert("Please Drop a Valid .txt File.");
	}
}
// When a value in matrix changes it will update the parent component
watch(matrix, () => emit("matrixUpdated", matrix));
</script>

<template>
	<div class="p-12" @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent=""
		@drop.prevent="handleDrop">
		<div
			:class="dropActive ? 'absolute w-4/6 h-5/6 left-0 top-0 m-8 bg-red-500/50 outline-8 outline-dashed outline-black flex items-center justify-center' : 'hidden'">
			<p>Suelte un Archivo .txt</p>
		</div>
		<div class="flex flex-col items-center">
			<div class="flex items-start">
				<div class="flex items-stretch gap-0">
					<div class="min-h-full w-4 border-blue-500 border-y-4 border-l-4 rounded-l-md"></div>
					<!-- Matrix -->
					<div class="rounded-lg border-2 border-blue-300 bg-blue-100 my-4">
						<table class="table-auto">
							<tr v-for="(row, i) in matrix.height" :key="i">
								<td class="" v-for="(col, j) in matrix.width" :key="j">
									<label class="min-w-8 flex justify-center hover:bg-sky-200 p-4">
										<!-- Bind the value of the matrix elements to a specific cell -->
										<input v-model="matrix.e[i][j]" :id="'e' + i + j" autocomplete="off"
											:class="isNaN(Number(matrix.e[i][j])) ? 'text-red-600 bg-red-200' : ''"
											class="text-center min-w-4 border-b-2 border-b-sky-400 focus:border-b-red-500 focus:outline-none bg-transparent appearance-none">
									</label>
								</td>
							</tr>
						</table>
					</div>
					<div class="min-h-full w-4 border-blue-500 border-y-4 border-r-4 rounded-r-md"></div>
				</div>
				<!-- Height Controller -->
				<div class="flex flex-col mx-1 items-center">
					<button @click="addRow">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
							fill="#000000">
							<path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
						</svg>
					</button>
					<input disabled="disabled" type="number" name="s" id="s" :value="matrix.height" @input="onHeightChange"
						class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
					<button @click="delRow">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
							fill="#000000">
							<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
						</svg>
					</button>
				</div>
			</div>
			<!-- Width Controller -->
			<div class="row-start-10 col-span-9 flex items-center gap-3 ">
				<button @click="delCol">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
						fill="#000000">
						<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
					</svg>
				</button>
				<input type="number" disabled="disabled" name="s" id="s" :value="matrix.width" @input="onWidthChange"
					class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
				<button @click="addCol">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
						fill="#000000">
						<path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>
input {
	field-sizing: content;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
	appearance: none;
	margin: 0;
}
</style>