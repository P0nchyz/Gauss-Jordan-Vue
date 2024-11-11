<script setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
	<div class="flex flex-col min-h-full bg-gray-100">
		<Header></Header>
		<div class="grow flex">
			<Sidebar />
			<RouterView />
		</div>
	</div>
</template>