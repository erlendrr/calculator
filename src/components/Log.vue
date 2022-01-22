<template>
	<div
		v-if="log.length"
		class="flex flex-col bg-zinc-800 mx-auto text-center p-4 rounded-xl text-lg min-w-[18rem] w-full max-w-sm"
	>
		<div class="pb-4 flex justify-between items-center">
			<h1 class="text-xl">Log</h1>
			<button @click="emit('clear')" class="bg-red-400 text-black rounded-xl p-4 select-none text-xl">Clear</button>
		</div>
		<div class="p-1 border-b border-zinc-700" v-for="(entry, i) in log" :key="i">
			{{ entry }}
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	log: Array,
})

const emit = defineEmits(['clear'])
</script>

<style scoped></style>
