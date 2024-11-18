import { createRouter, createWebHistory } from "vue-router";
import Inversa from "@/views/Inversa.vue";
import Determinante from "@/views/Determinante.vue";
import PasoAPaso from "@/views/PasoAPaso.vue";
import SEL from "@/views/SEL.vue";
import DPP from "@/views/DPP.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Inversa",
			component: Inversa,
		},
		{
			path: "/Determinante",
			name: "Determinante",
			component: Determinante,
		},
		{
			path: "/PasoAPaso",
			name: "PasoAPaso",
			component: PasoAPaso,
		},
		{
			path: "/SEL",
			name: "SEL",
			component: SEL,
		},
		{
			path: "/DPP",
			name: "DPP",
			component: DPP,
		},
	],
});

export default router;
