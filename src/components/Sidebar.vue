<script setup>
import { RouterLink, useRoute } from 'vue-router';

function isActiveLink(routePath) {
	const route = useRoute();
	return route.path === routePath;
}
</script>

<template>
	<nav
		class="flex flex-col bg-blue-50 min-w-fit items-center rounded-xl shadow-lg hover:shadow-xl hover:outline-2 outline outline-1 outline-gray-300 px-8 m-4">
		<h1 class="text-2xl my-4">Menú</h1>
		<div class="flex flex-col items-center gap-8">
			<li :class="[isActiveLink('/') ? 'bg-sky-200' : 'bg-white hover:bg-gray-200',
				'shadow-md', 'list-none', 'rounded', 'p-2']">
				<RouterLink to="./">Matriz Inversa</RouterLink>
			</li>
			<li :class="[isActiveLink('/Determinante') ? 'bg-sky-200' : 'bg-white hover:bg-gray-300',
				'shadow-md', 'list-none', 'rounded', 'p-2']">
				<RouterLink to="./Determinante">Determinante</RouterLink>
			</li>
			<li :class="[isActiveLink('/PasoAPaso') ? 'bg-sky-200' : 'bg-white hover:bg-gray-300',
				'shadow-md', 'list-none', 'rounded', 'p-2']">
				<RouterLink to="./PasoAPaso">Paso a Paso</RouterLink>
			</li>
			<li :class="[isActiveLink('/SEL') ? 'bg-sky-200' : 'bg-white hover:bg-gray-300',
				'shadow-md', 'list-none', 'rounded', 'p-2']">
				<RouterLink to="./SEL">Sistemas de Ecuaciones Lineales</RouterLink>
			</li>
			<li :class="[isActiveLink('/DPP') ? 'bg-sky-200' : 'bg-white hover:bg-gray-300',
				'shadow-md', 'list-none', 'rounded', 'p-2']">
				<RouterLink to="./DPP">Determinantes Paso a Paso</RouterLink>
			</li>
		</div>
	</nav>
</template>