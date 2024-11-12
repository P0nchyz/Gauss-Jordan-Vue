<script setup>
import AugMatrix from '@/components/AugMatrix.vue';
import InputAugMatrix from '@/components/InputAugMatrix.vue';
import InputLinearMatrix from '@/components/InputLinearMatrix.vue';
import { reactive, ref } from 'vue';
import { runPasoAPaso } from '../../public/gauss_runner';

const isRunning = ref(true);

const matrixToOperate = reactive({
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
});

console.log(matrixToOperate);

function updateAugMatrix(e) {
	matrixToOperate.width = e.width;
	matrixToOperate.height = e.height;
	matrixToOperate.lMat = e.lMat,
		matrixToOperate.rMat = e.rMat;
}

function clearAugMatrix() {
	matrixToOperate.lMat.e = matrixToOperate.lMat.e.map(row => row.map(() => undefined));
	matrixToOperate.rMat.e = matrixToOperate.rMat.e.map(row => row.map(() => undefined));
}

const pos = reactive({ i: 0, j: 0 });
const buttonState = reactive({
	sum: {
		open: false,
	},
	mult: {
		open: false
	},
	auto: {
		one: true
	}
});

function changePos(dir) {
	switch (dir) {
		case 'l':
			if (pos.j > 0) {
				pos.j--;
			}
			break;
		case 'u':
			if (pos.i > 0) {
				pos.i--;
			}
			break;
		case 'd':
			if (pos.i < matrixToOperate.height - 1) {
				pos.i++;
			}
			break;
		case 'r':
			if (pos.j < matrixToOperate.lMat.width - 1) {
				pos.j++;
			}
			break;
		default:
			alert("WTF");
			break;
	}
}
function runProgram(operation) {
	let retAugMat = runPasoAPaso(matrixToOperate, pos, operation);
	matrixToOperate.width = retAugMat.width;
	matrixToOperate.height = retAugMat.height;
	matrixToOperate.lMat = retAugMat.lMat;
	matrixToOperate.rMat = retAugMat.rMat;
}

document.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'ArrowUp':
			changePos('u');
			break;
		case 'ArrowDown':
			changePos('d');
			break;
		case 'ArrowLeft':
			changePos('l');
			break;
		case 'ArrowRight':
			changePos('r');
			break;
		default:
			alert("Catalina");
			break;
	}
})
</script>

<template>
	<main class="grow flex flex-col items-center">
		<section :class="!isRunning ? 'self-stretch flex flex-col items-center relative' : 'hidden'">
			<InputAugMatrix :aug-matrix="matrixToOperate" @aug-matrix-updated="updateAugMatrix" />
			<!-- Action Buttons Section -->
			<div class="self-end mx-40">
				<div>
					<button @click="clearAugMatrix"
						class="bg-white border-2 border-blue-500 text-black p-2 rounded m-4">Limpiar</button>
					<button @click="isRunning = !isRunning" class="bg-gradient-to-r from-blue-500 via-sky-500 to-blue-600 text-white hover:bg-gradient-to-br
						focus:ring-2 focus:outline-none focus:ring-blue-800 shadow-lg shadow-blue-500/50 p-2 rounded m-4">
						Continuar
					</button>
				</div>
			</div>
		</section>
		<section :class="isRunning ? 'self-stretch flex flex-col items-center relative' : 'hidden'">
			<div class="flex items-center">
				<span>
					<button @click="isRunning = !isRunning">
						<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
							fill="#000000">
							<path
								d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
						</svg>
					</button>
				</span>
				<AugMatrix :aug-matrix="matrixToOperate" :pos="pos" />
			</div>
			<div id="pAp-control-panel" class="flex gap-x-16">
				<div id="pos-selector" class="flex items-center">
					<div><button @click="changePos('l')">
							<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px"
								fill="#000000">
								<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
							</svg>
						</button></div>
					<div class="flex flex-col">
						<span><button @click="changePos('u')">
								<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960"
									width="32px" fill="#000000">
									<path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
								</svg>
							</button></span>
						<span></span>
						<span><button @click="changePos('d')">
								<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960"
									width="32px" fill="#000000">
									<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
								</svg>
							</button></span>
					</div>
					<div><button @click="changePos('r')">
							<svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px"
								fill="#000000">
								<path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
							</svg>
						</button></div>
				</div>
				<div id="buttons-control" class="flex items-center gap-8">
					<div class="flex flex-col items-center">
						<div :class="(buttonState.sum.open) ? 'flex gap-x-2' : 'hidden'">
							<span>
								<button @click="runProgram('+')"
									class="w-9 aspect-square rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">+</button>
							</span>
							<span>
								<button @click="runProgram('-')"
									class="w-9 aspect-square rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">-</button>
							</span>
						</div>
						<div>
							<span :class="(buttonState.sum.open) ? 'block' : 'hidden'">
								<button @click="buttonState.sum.open = !buttonState.sum.open">x</button>
							</span>
							<span :class="(!buttonState.sum.open) ? 'block' : 'hidden'">
								<button
									class="rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2"
									@click="buttonState.sum.open = !buttonState.sum.open">+
									/ -</button>
							</span>
						</div>
					</div>
					<div class="flex flex-col items-center">
						<div :class="(buttonState.mult.open) ? 'flex gap-x-2' : 'hidden'">
							<span>
								<button @click="runProgram('*')"
									class="w-9 aspect-square rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">*</button>
							</span>
							<span>
								<button @click="runProgram('/')"
									class="w-9 aspect-square rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">÷</button>
							</span>
						</div>
						<div>
							<span :class="(buttonState.mult.open) ? 'block' : 'hidden'">
								<button @click="buttonState.mult.open = !buttonState.mult.open">x</button>
							</span>
							<span :class="(!buttonState.mult.open) ? 'block' : 'hidden'">
								<button @click="buttonState.mult.open = !buttonState.mult.open"
									class="rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">*
									/ ÷</button>
							</span>
						</div>
					</div>
					<div>
						<span>
							<button @click="runProgram('m')"
								class="rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">
								<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
									width="24px" fill="#000000">
									<path
										d="M320-440v-287L217-624l-57-56 200-200 200 200-57 56-103-103v287h-80ZM600-80 400-280l57-56 103 103v-287h80v287l103-103 57 56L600-80Z" />
								</svg>
							</button>
						</span>
					</div>
					<div>
						<span :class="(!buttonState.auto.one) ? 'block' : 'hidden'">
							<button disabled="disabled"
								class="w-9 aspect-square rrounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">0</button>
						</span>
						<span :class="(buttonState.auto.one) ? 'block' : 'hidden'">
							<button disabled="disabled"
								class="w-9 aspect-square rounded-full border-2 border-blue-500 hover:border-blue-700 active:bg-blue-400 active:text-white text-blue-700 font-bold py-1 px-2">1</button>
						</span>
					</div>
				</div>
			</div>
		</section>
	</main>
</template>