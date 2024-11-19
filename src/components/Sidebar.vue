<script setup>
import { RouterLink, useRoute } from 'vue-router';
import SELIcon from '@/assets/img/SELIcon_White.png'
import PasoAPasoIcon from '@/assets/img/pasoAPasoIcon_White.png'
import InversaIcon from '@/assets/img/inversaIcon_White.png'
import DeterminanteIcon from '@/assets/img/determinanteIcon_White.png'
import logo from '@/assets/img/GJ.svg'

function isActiveLink(routePath) {
	const route = useRoute();
	return route.path === routePath;
}
</script>

<template>
	<div
		class="flex flex-col max-h-[100vh] overflow-auto gap-10 bg-transparent min-w-fit items-center font-serif text-white px-4 py-12">
		<div class="flex gap-2 items-center">
			<img :src="logo" alt="" class="size-12">
			<h1 class="font-extrabold text-3xl">Gauss Jordan</h1>
		</div>
		<nav class="flex flex-col gap-8 text-xl font-medium">
			<li :class="[isActiveLink('/') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./" class="flex items-center gap-2">
					<img :src="InversaIcon" alt="" class="size-12">
					<p>Matriz Inversa</p>
				</RouterLink>
			</li>
			<li :class="[isActiveLink('/Determinante') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./Determinante" class="flex items-center gap-2">
					<img :src="DeterminanteIcon" alt="" class="size-12">
					<p>Determinante</p>
				</RouterLink>
			</li>
			<li :class="[isActiveLink('/PasoAPaso') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./PasoAPaso" class="flex items-center gap-2">
					<img :src="PasoAPasoIcon" alt="" class="size-12">
					<p>Paso A Paso</p>
				</RouterLink>
			</li>
			<li :class="[isActiveLink('/SEL') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./SEL" class="flex items-center gap-2">
					<img :src="SELIcon" alt="" class="size-12">
					<p>Sistema de Ecuaciones <br> Lineales</p>
				</RouterLink>
			</li>
			<li :class="[isActiveLink('/DPP') ? 'bg-blue-700' : 'hover:bg-blue-600',
				'hover:shadow-md']" class="list-none rounded-lg p-3">
				<RouterLink to="./DPP" class="flex items-center gap-2">
					<p>Determinantes Paso a Paso</p>
				</RouterLink>
			</li>
		</nav>
	</div>
</template>