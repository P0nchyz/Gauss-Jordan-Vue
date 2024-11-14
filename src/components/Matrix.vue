<script setup>
import { toFraction } from '@/main';
import { reactive } from 'vue';

const props = defineProps({
	matrix: {
		type: Object,
		default: {
			width: 2,
			height: 2,
			e: [[1, 0], [0, 2]]
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
	<div class="inline-block rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
		<table class="table-auto">
			<tr v-for="(row,i) in matrix.height">
				<td class="" v-for="(col,j) in matrix.width">
					<p class="text-center hover:bg-sky-200 p-4">{{ processInput(matrix.e[i][j]) }}</p>
				</td>
			</tr>
		</table>
	</div>
</template>

<style></style>