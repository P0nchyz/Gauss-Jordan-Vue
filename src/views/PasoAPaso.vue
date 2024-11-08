<script setup>
import InputAugMatrix from '@/components/InputAugMatrix.vue';
import { ref } from 'vue';

const isRunning = ref(false);

</script>

<template>
	<main class="grow flex flex-col items-center">
		<section :class="!isRunning ? 'self-stretch flex flex-col items-center relative' : 'hidden'">
			<InputAugMatrix />
			<div></div>
		</section>
		<section :class="isRunning ? 'self-stretch flex flex-col items-center relative' : 'hidden'">
			
		</section>
	</main>
</template>