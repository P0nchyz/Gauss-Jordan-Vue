<script setup>
import Matrix from '@/components/Matrix.vue'
import { reactive } from 'vue';
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
	},
	pos: {
		type: Object,
		default: {i: 0, j: 0}
	}
})
const augMatrix = reactive(props.augMatrix);

</script>

<template>
	<div class="flex m-16">
		<div class="inline-block rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
			<table class="table-auto">
				<tr v-for="(row, i) in augMatrix.lMat.height" :class="(i === pos.i) ? 'bg-blue-400' : 'bg-transparent'">
					<td class="" v-for="(col, j) in augMatrix.lMat.width" :class="(j === pos.j && i === pos.i) ? 'bg-red-500/50' : 'bg-transparent'">
						<p class="text-center hover:bg-sky-200 p-4">{{ augMatrix.lMat.e[i][j] }}</p>
					</td>
				</tr>
			</table>
		</div>
		<div class="inline-block rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
			<table class="table-auto">
				<tr v-for="(row, i) in augMatrix.rMat.height" :class="(i === pos.i) ? 'bg-blue-400' : 'bg-transparent'">
					<td class="" v-for="(col, j) in augMatrix.rMat.width">
						<p class="text-center hover:bg-sky-200 p-4">{{ augMatrix.rMat.e[i][j] }}</p>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>