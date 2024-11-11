<script setup>
import { fileToMatrix } from '@/main';
import { reactive, ref, watch } from 'vue';

const emit = defineEmits(['augMatrixUpdated']);

const props = defineProps({
	augMatrix: {
		type: Object,
		default: {
			height: 3,
			width: 6,
			lMat: {
				height: 3,
				width: 3,
				e: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
			},
			rMat: {
				height: 3,
				width: 3,
				e: [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
			}
		}
	}
});

const augMatrix = reactive(props.augMatrix);

function addRow() {
	augMatrix.lMat.e.push(new Array(augMatrix.lMat.width).fill(undefined));
	augMatrix.rMat.e.push(new Array(augMatrix.rMat.width).fill(undefined));
	augMatrix.height++;
	augMatrix.lMat.height++;
	augMatrix.rMat.height++;
}
function delRow() {
	augMatrix.lMat.e.pop();
	augMatrix.rMat.e.pop();
	augMatrix.height--;
	augMatrix.lMat.height--;
	augMatrix.rMat.height--;
}
function addCol(direction) {
	augMatrix.width++;
	if (direction === 'l') {
		augMatrix.lMat.width++;
		augMatrix.lMat.e.forEach(row => row.push(undefined));
	} else {
		augMatrix.rMat.width++;
		augMatrix.rMat.e.forEach(row => row.push(undefined));
	}
}
function delCol(direction) {
	augMatrix.width--;
	if (direction === 'l') {
		augMatrix.lMat.width--;
		augMatrix.lMat.e.forEach(row => row.pop());
	} else {
		augMatrix.rMat.width--;
		augMatrix.rMat.e.forEach(row => row.pop());
	}
}

const leftDropActive = ref(false);
function toggleLeftActive() {
	console.log(leftDropActive.value);
	leftDropActive.value = !leftDropActive.value;
}
const rightDropActive = ref(false);
function toggleRightActive() {
	console.log(rightDropActive.value);
	rightDropActive.value = !rightDropActive.value;
}

function handleLeftDrop(e) {
	toggleLeftActive();
	const file = e.dataTransfer.files[0];
	if (file && file.type === "text/plain") {
		fileToMatrix(file, (fileMatrix) => {
			augMatrix.lMat.width = fileMatrix.width;
			augMatrix.height = fileMatrix.height;
			augMatrix.lMat.e = fileMatrix.e;
			augMatrix.width = augMatrix.lMat.width + augMatrix.rMat.width;
		});
		console.log(augMatrix);
	} else {
		alert("Please Drop a Valid .txt File.");
	}
}
function handleRightDrop(e) {
	toggleRightActive();
	const file = e.dataTransfer.files[0];
	if (file && file.type === "text/plain") {
		fileToMatrix(file, (fileMatrix) => {
			augMatrix.rMat.width = fileMatrix.width;
			augMatrix.height = fileMatrix.height;
			augMatrix.rMat.e = fileMatrix.e;
			augMatrix.width = augMatrix.lMat.width + augMatrix.rMat.width;
		});
		console.log(augMatrix);
	} else {
		alert("Please Drop a Valid .txt File.");
	}
}

watch(augMatrix, () => emit('augMatrixUpdated', augMatrix));

</script>

<template>
	<div class="p-12 flex">
		<div class="flex">
			<div class="relative flex flex-col items-center" @dragenter.prevent="toggleLeftActive"
				@dragleave.prevent="toggleLeftActive" @dragover.prevent="" @drop.prevent="handleLeftDrop">
				<div :class="leftDropActive ? 'absolute w-full h-full bg-red-500/50' : 'hidden'">
					<p>Suelte un Archivo .txt</p>
				</div>
				<div class="rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
					<table class="table-auto">
						<tr v-for="(row, i) in augMatrix.lMat.height" :key="row.id">
							<td class="" v-for="(col, j) in augMatrix.lMat.width" :key="col.id">
								<label class="min-w-8 flex justify-center hover:bg-sky-200 p-4">
									<!-- Bind the value of the matrix elements to a specific cell -->
									<input v-model="augMatrix.lMat.e[i][j]" :id="'le' + i + j" autocomplete="off"
										class="h-4 min-w-4 border-b-2 border-b-sky-400 focus:border-b-red-500 focus:outline-none bg-transparent appearance-none">
								</label>
							</td>
						</tr>
					</table>
				</div>
				<!-- Width Controller -->
				<div class="row-start-10 col-span-9 flex items-center gap-3 ">
					<button @click="delCol('l')">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
							fill="#000000">
							<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
						</svg>
					</button>
					<input type="number" name="s" id="s" :value="augMatrix.lMat.width"
						class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
					<button @click="addCol('l')">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
							fill="#000000">
							<path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
						</svg>
					</button>
				</div>
			</div>
			<div class="relative flex flex-col items-center" @dragenter.prevent="toggleRightActive"
				@dragleave.prevent="toggleRightActive" @dragover.prevent="" @drop.prevent="handleRightDrop">
				<div :class="rightDropActive ? 'absolute w-full h-full bg-red-500/50' : 'hidden'">
					<p>Suelte un Archivo .txt</p>
				</div>
				<div class="rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
					<table class="table-auto">
						<tr v-for="(row, i) in augMatrix.rMat.height">
							<td class="" v-for="(col, j) in augMatrix.rMat.width">
								<label class="min-w-8 flex justify-center hover:bg-sky-200 p-4">
									<!-- Bind the value of the matrix elements to a specific cell -->
									<input v-model="augMatrix.rMat.e[i][j]" :id="'le' + i + j" autocomplete="off"
										class="h-4 min-w-4 border-b-2 border-b-sky-400 focus:border-b-red-500 focus:outline-none bg-transparent appearance-none">
								</label>
							</td>
						</tr>
					</table>
				</div>
				<!-- Width Controller -->
				<div class="row-start-10 col-span-9 flex items-center gap-3 ">
					<button @click="delCol('r')">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
							fill="#000000">
							<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
						</svg>
					</button>
					<input type="number" name="s" id="s" :value="augMatrix.rMat.width"
						class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
					<button @click="addCol('r')">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
							fill="#000000">
							<path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
						</svg>
					</button>
				</div>
			</div>

		</div>
		<!-- Height Controller -->
		<div class="col-start-10 row-span-9 flex flex-col items-center">
			<button @click="addRow">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
					fill="#000000">
					<path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
				</svg>
			</button>
			<input type="number" name="s" id="s" :value="augMatrix.height"
				class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
			<button @click="delRow">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
					fill="#000000">
					<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
				</svg>
			</button>
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