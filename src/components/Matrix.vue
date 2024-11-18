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
</script>

<template>
	<div class="flex items-stretch gap-1">
		<div class="min-h-full w-4 border-blue-500 border-y-4 border-l-4 rounded-l-md"></div>
		<div class="rounded-md border-2 border-blue-300 bg-blue-100 my-4">
			<table class="table-auto">
				<tr v-for="(row, i) in matrix.height" :key="i" class="">
					<td v-for="(col, j) in matrix.width" :key="j">
						<p class="text-center hover:bg-sky-200 p-4">{{ processInput(matrix.e[i][j]) }}</p>
					</td>
				</tr>
			</table>
		</div>
		<div class="min-h-full w-4 border-blue-500 border-y-4 border-r-4 rounded-r-md"></div>
	</div>
</template>
