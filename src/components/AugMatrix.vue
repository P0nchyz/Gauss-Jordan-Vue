<script setup>
import { reactive } from 'vue';
import { toFraction } from '@/main';
const props = defineProps({
	augMatrix: {
		type: Object,
		required: true,
		default() {
			return {
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
	},
	pos: {
		type: Object,
		default() {
			return { i: 0, j: 0 }
		}
	}
})
const augMatrix = reactive(props.augMatrix);
function processInput(inputNumber) {
	let fraction = toFraction(inputNumber);
	return (fraction.denominator === 1 || fraction.numerator === 0) ? fraction.numerator : `${fraction.numerator} / ${fraction.denominator}`;
}
function isFraction(inputNumber) {
	let fraction = toFraction(inputNumber);
	return (fraction.denominator === 1 || fraction.numerator === 0) ? false : true;
}
</script>

<template>
	<div class="flex m-16">
		<div class="inline-block rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
			<table class="table-auto">
				<tr v-for="(row, i) in augMatrix.lMat.height" :class="(i === pos.i) ? 'bg-blue-400' : 'bg-transparent'"
					:key="i">
					<td class="" v-for="(col, j) in augMatrix.lMat.width"
						:class="(j === pos.j && i === pos.i) ? 'bg-red-500/50' : 'bg-transparent'" :key="j">
						<div v-if="isFraction(augMatrix.lMat.e[i][j])" class="flex flex-col w-fit items-center p-4">
							<p class="border-solid border-b-black border-b-4">{{ toFraction(augMatrix.lMat.e[i][j]).numerator }}
							</p>
							<p>{{ toFraction(augMatrix.lMat.e[i][j]).denominator }}</p>
						</div>
						<div v-else class="p-4">
							<p>{{ toFraction(augMatrix.lMat.e[i][j]).numerator }}</p>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="inline-block rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
			<table class="table-auto">
				<tr v-for="(row, i) in augMatrix.rMat.height" :class="(i === pos.i) ? 'bg-blue-400' : 'bg-transparent'"
					:key="i">
					<td class="" v-for="(col, j) in augMatrix.rMat.width" :key="j">
						<div v-if="isFraction(augMatrix.rMat.e[i][j])" class="flex flex-col w-fit items-center p-4">
							<p class="border-solid border-b-black border-b-4">{{ toFraction(augMatrix.rMat.e[i][j]).numerator }}
							</p>
							<p>{{ toFraction(augMatrix.rMat.e[i][j]).denominator }}</p>
						</div>
						<div v-else class="p-4">
							<p>{{ toFraction(augMatrix.rMat.e[i][j]).numerator }}</p>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>