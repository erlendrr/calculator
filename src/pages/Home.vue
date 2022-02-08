<template>
	<div class="flex flex-col h-screen text-white space-y-4">
		<Calculator @addToLog="addToLog" />
		<transition
			enter-active-class="transition ease-out duration-600"
			enter-from-class="transform opacity-0 scale-95"
			enter-to-class="transform opacity-100 scale-100"
			leave-active-class="transition ease-in duration-75"
			leave-from-class="transform opacity-100 scale-100"
			leave-to-class="transform opacity-0 scale-95"
		>
			<Log :log="log" @clear="clear" />
		</transition>
	</div>
</template>

<script setup lang="ts">
import Calculator from '@/components/Calculator.vue'
import Log from '@/components/Log.vue'
import { Ref, ref } from 'vue'

const log: Ref<string[]> = ref([])

const show = ref(false)
setTimeout(() => {
	show.value = true
}, 200)
if (localStorage.log) {
	log.value = JSON.parse(localStorage.log)
}
function addToLog(equation: string) {
	log.value.unshift(equation)
	localStorage.log = JSON.stringify(log.value)
}

function clear() {
	log.value = []
	localStorage.log = ''
}
</script>
<style>
body {
	@apply bg-zinc-900 text-white;
}
</style>
