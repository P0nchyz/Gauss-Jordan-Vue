<script setup>
import { fileToMatrix } from '@/main';
import { reactive, ref } from 'vue';



const props = defineProps({
	augMatrix: {
		type: Object,
		default: {
			height: 3,
			lWidth: 3,
			rWidth: 3,
			le: [[1,2,3],[4,5,6],[7,8,9]],
			re: [[1,0,0],[0,1,0],[0,0,1]]
		}
	}
});

const augMatrix = reactive(props.augMatrix);
console.log(augMatrix);

function addRow() {
	augMatrix.le.push(new Array(augMatrix.lWidth).fill(undefined));
	augMatrix.re.push(new Array(augMatrix.rWidth).fill(undefined));
	augMatrix.height++;
}
function delRow() {
	augMatrix.le.pop();
	augMatrix.re.pop();
	augMatrix.height--;
}
function addCol() {
	augMatrix.le.forEach(row => row.push(undefined));
	augMatrix.re.forEach(row => row.push(undefined));
	augMatrix.lWidth++;
	augMatrix.rWidth++;
}
function delCol() {
	augMatrix.le.forEach(row => row.pop());
	augMatrix.re.forEach(row => row.pop());
	augMatrix.lWidth--;
	augMatrix.rWidth--;
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
			augMatrix.lWidth = fileMatrix.width;
			augMatrix.rWidth = fileMatrix.width;
			augMatrix.height = fileMatrix.height;
			augMatrix.le = fileMatrix.e;
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
			augMatrix.rWidth = fileMatrix.width;
			augMatrix.lWidth = fileMatrix.width;
			augMatrix.height = fileMatrix.height;
			augMatrix.re = fileMatrix.e;
		});
		console.log(augMatrix);
	} else {
		alert("Please Drop a Valid .txt File.");
	}
}

</script>

<template>
	<div class="p-12 flex flex-col items-center">
		<div class="flex">
			<div class="relative"
			@dragenter.prevent="toggleLeftActive"
			@dragleave.prevent="toggleLeftActive"
			@draogver.prevent=""
			@drop.prevent="handleLeftDrop" >
				<div :class="leftDropActive ? 'absolute w-full h-full bg-red-500/50' : 'hidden'">
					<p>Suelte un Archivo .txt</p>
				</div>
				<div class="rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
					<table class="table-auto">
						<tr v-for="i in augMatrix.height">
							<td class="" v-for="j in augMatrix.lWidth">
								<label class="min-w-8 flex justify-center hover:bg-sky-200 p-4">
									<!-- Bind the value of the matrix elements to a specific cell -->
									<input
										v-model="augMatrix.le[i-1][j-1]" :id="'le'+i+j" autocomplete="off"
										class="h-4 min-w-4 border-b-2 border-b-sky-400 focus:border-b-red-500 focus:outline-none bg-transparent appearance-none">
								</label>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<div class="relative"
			@dragenter.prevent="toggleRightActive"
			@dragleave.prevent="toggleRightActive"
			@dragover.prevent=""
			@drop.prevent="handleRightDrop">
				<div :class="rightDropActive ? 'absolute w-full h-full bg-red-500/50' : 'hidden'">	
					<p>Suelte un Archivo .txt</p>
				</div>
				<div class="rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
					<table class="table-auto">
						<tr v-for="i in augMatrix.height">
							<td class="" v-for="j in augMatrix.rWidth">
								<label class="min-w-8 flex justify-center hover:bg-sky-200 p-4">
									<!-- Bind the value of the matrix elements to a specific cell -->
									<input
										v-model="augMatrix.re[i-1][j-1]" :id="'le'+i+j" autocomplete="off"
										class="h-4 min-w-4 border-b-2 border-b-sky-400 focus:border-b-red-500 focus:outline-none bg-transparent appearance-none">
								</label>
							</td>
						</tr>
					</table>
				</div>
			</div>
			<!-- Height Controller -->
			<div class="col-start-10 row-span-9 flex flex-col items-center">
				<button @click="addRow">
					<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
				</button>
				<input type="number" name="s" id="s" :value="augMatrix.height" class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
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
			<input type="number" name="s" id="s" :value="augMatrix.rWidth" class="outline outline-1 min-w-6 rounded-lg text-center appearance-none">
			<button @click="addCol">
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
			</button>
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