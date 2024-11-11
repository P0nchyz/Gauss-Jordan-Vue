<script setup>
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

</script>

<template>
	<div class="inline-block rounded-lg border-2 border-sky-300 bg-sky-100 m-2">
		<table class="table-auto">
			<tr v-for="i in matrix.height">
				<td class="" v-for="j in matrix.width">
					<p class="text-center hover:bg-sky-200 p-4">{{ matrix.e[i - 1][j - 1] }}</p>
				</td>
			</tr>
		</table>
	</div>
</template>

<style></style>