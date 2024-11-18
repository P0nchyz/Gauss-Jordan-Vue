<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
	<div class="flex min-w-full min-h-full bg-blue-500">
		<Sidebar />
		<div class="flex flex-col grow max-h-[100vh] bg-white overflow-y-auto rounded-l-[2vh] shadow-[-4px_0_32px_4px_rgba(0,0,0,0.25)]">
			<RouterView />
		</div>
	</div>
</template>