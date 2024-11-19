<script setup>
import { toFraction } from '@/main';
import { reactive } from 'vue';

const props = defineProps({
	matrix: {
		type: Object,
		default() {
			return {
				width: 2,
				height: 2,
				e: [[1, 0], [0, 2]]
			}
		}
	}
})
const matrix = reactive(props.matrix);

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
	<div class="flex items-stretch gap-1">
		<div class="min-h-full w-4 border-blue-500 border-y-4 border-l-4 rounded-l-md"></div>
		<div class="rounded-md border-2 border-blue-300 bg-blue-100 my-4">
			<table class="table-auto">
				<tr v-for="(row, i) in matrix.height" :key="i" class="">
					<td v-for="(col, j) in matrix.width" :key="j">
						<div v-if="isFraction(matrix.e[i][j])" class="flex flex-col w-fit items-center p-4">
							<p class="border-solid border-b-black border-b-4">{{ toFraction(matrix.e[i][j]).numerator }}</p>
							<p>{{ toFraction(matrix.e[i][j]).denominator }}</p>
						</div>
						<div v-else class="p-4">
							<p>{{ toFraction(matrix.e[i][j]).numerator }}</p>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="min-h-full w-4 border-blue-500 border-y-4 border-r-4 rounded-r-md"></div>
	</div>
</template>
