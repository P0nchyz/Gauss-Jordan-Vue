<script setup>
import { fileToMatrix } from '@/main';
import { reactive, ref, watch } from 'vue';
const emit = defineEmits(['matrixUpdated'])
// Define Default Matrix to be Passsed as Prop
const props = defineProps({
	matrix: {
		type: Object,
		default: {
			height: 3,
			width: 3,
			e: [[1,0,0],[0,1,0],[0,0,1]]
		}
	}
});
// Initialize the value of the matrix as the matrix passed as prop
const matrix = reactive(props.matrix);
// Adds a new row with undefined values
function addRow(){
	matrix.e.push(new Array(matrix.width).fill(undefined));
	matrix.height++;
}
function delRow() {
	matrix.e.pop();
	matrix.height--;
}
// Adds a new column with undefined values
function addCol(){
	matrix.e.forEach(row => row.push(undefined));
	matrix.width++;
}
function delCol(){
	matrix.e.forEach(row => row.pop());
	matrix.width--;
}
// TO-DO: Implement use of value change
function onWidthChange(e){
	alert("no")
}
function onHeightChange(e){
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
		});
	} else {
		alert("Please Drop a Valid .txt File.");
	}
}
// When a value in matrix changes it will update the parent component
watch(matrix, () => emit("matrixUpdated", matrix));
</script>

<template>
	<div class="p-12"
	@dragenter.prevent="toggleActive"
	@dragleave.prevent="toggleActive"
	@dragover.prevent=""
	@drop.prevent="handleDrop">
		<div :class="dropActive ? 'absolute w-4/6 h-5/6 left-0 top-0 m-8 bg-red-500/50 outline-8 outline-dashed outline-black flex items-center justify-center' : 'hidden'">
			<p>Suelte un Archivo .txt</p>
		</div>
		<div class="flex flex-col items-center">
			<div class="flex items-start">
				<!-- Matrix -->
				<div class="rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
					<table class="table-auto">
						<tr v-for="i in matrix.height">
							<td class="" v-for="j in matrix.width">
								<label class="min-w-8 flex justify-center hover:bg-sky-200 p-4">
									<!-- Bind the value of the matrix elements to a specific cell -->
									<input
										v-model="matrix.e[i-1][j-1]" :id="'e'+i+j" autocomplete="off"
										class="h-4 min-w-4 border-b-2 border-b-sky-400 focus:border-b-red-500 focus:outline-none bg-transparent appearance-none">
								</label>
							</td>
						</tr>
					</table>
				</div>
				<!-- Height Controller -->
				<div class="col-start-10 row-span-9 flex flex-col items-center">
					<button @click="addRow">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
					</button>
					<input type="number" name="s" id="s" :value="matrix.height" @input="onHeightChange" class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
					<button @click="delRow">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
					</button>
				</div>
			</div>
			<!-- Width Controller -->
			<div class="row-start-10 col-span-9 flex items-center gap-3 ">
				<button @click="delCol">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
				</button>
				<input type="number" name="s" id="s" :value="matrix.width" @input="onWidthChange" class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
				<button @click="addCol">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
				</button>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>
input {
	field-sizing: content;
}
input::-webkit-inner-spin-button, input::-webkit-outer-spin-button {
	appearance: none;
	margin: 0;
}

</style>