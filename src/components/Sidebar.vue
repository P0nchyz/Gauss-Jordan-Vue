<script setup>
import { RouterLink, useRoute } from 'vue-router';

function isActiveLink(routePath) {
	const route = useRoute();
	return route.path === routePath;
}
</script>

<template>
	<div class="flex flex-col max-h-[100vh] overflow-auto gap-10 bg-transparent min-w-fit items-center font-serif text-white px-4 py-12">
		<div>
			<h1 class="font-extrabold text-3xl">Gauss Jordan</h1>
		</div>
		<nav class="flex flex-col gap-8 text-xl font-medium">
			<li :class="[isActiveLink('/') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./">Matriz Inversa</RouterLink>
			</li>
			<li :class="[isActiveLink('/Determinante') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./Determinante">Determinante</RouterLink>
			</li>
			<li :class="[isActiveLink('/PasoAPaso') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./PasoAPaso">Paso A Paso</RouterLink>
			</li>
			<li :class="[isActiveLink('/SEL') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./SEL">Sistema de Ecuaciones Lineales</RouterLink>
			</li>
			<li :class="[isActiveLink('/DPP') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./DPP">Determinantes Paso a Paso</RouterLink>
			</li>
		</nav>
	</div>
</template>