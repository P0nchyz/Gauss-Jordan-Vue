<script setup>
import Matrix from '@/components/Matrix.vue'
import { reactive, watch } from 'vue';
const props = defineProps({
	linearMatrix: {
		type: Object,
		default() {
			return {
				width: 3,
				height: 3,
				e: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
				a: [0, 0, 0]
			}
		}
	}
})
const augMatrix = reactive(props.linearMatrix);

const lMat = reactive({
	width: augMatrix.width,
	height: augMatrix.height,
	e: augMatrix.e
});
const rMat = reactive({
	width: 1,
	height: augMatrix.height,
	e: augMatrix.a.map(e => [e])
})
watch(augMatrix, () => {
	lMat.width = augMatrix.width;
	lMat.height = augMatrix.height;
	lMat.e = augMatrix.e;
	rMat.width = 1;
	rMat.height = augMatrix.height;
	rMat.e = augMatrix.a.map(e => [e]);
});
</script>

<template>
	<div class="flex m-16">
		<Matrix :matrix="lMat" />
		<Matrix :matrix="rMat" />
	</div>
</template>