<template>
	<div class="bg-zinc-800 mx-auto text-center p-4 rounded-xl text-lg min-w-[18rem] w-full max-w-sm">
		<div class="bg-zinc-700 rounded-xl p-4 text-right flex flex-col">
			<span v-if="!accumulator && (lastOperation == '' || lastOperation == '=')" class="h-7"></span>
			<div class="text-gray-400">
				<span v-if="accumulator">{{ accumulator }}</span>
				<span v-if="lastOperation != '='"> {{ ` ${lastOperation}` }}</span>
			</div>
			<div class="text-3xl break-words">
				<span>{{ cache }}</span>
				<span v-if="hasSetDot">.</span>
			</div>
		</div>
		<div class="buttons grid grid-cols-4 gap-4 mt-4">
			<button @click="AC()" class="bg-orange-400 text-black col-span">AC</button>
			<div></div>
			<div></div>
			<button @click="divide()" class="action">÷</button>
			<button @click="onNumClick(7)" class="num">7</button>
			<button @click="onNumClick(8)" class="num">8</button>
			<button @click="onNumClick(9)" class="num">9</button>
			<button @click="multiply()" class="action">x</button>
			<button @click="onNumClick(4)" class="num">4</button>
			<button @click="onNumClick(5)" class="num">5</button>
			<button @click="onNumClick(6)" class="num">6</button>
			<button @click="subtract()" class="action">-</button>
			<button @click="onNumClick(1)" class="num">1</button>
			<button @click="onNumClick(2)" class="num">2</button>
			<button @click="onNumClick(3)" class="num">3</button>
			<button @click="add()" class="action">+</button>
			<button @click="onNumClick(0)" class="num">0</button>
			<button @click="onDotClick()" class="num">.</button>
			<button @click="del()" class="bg-red-400 text-black">DEL</button>
			<button @click="equals()" class="bg-green-300 text-black">=</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'

const accumulator: Ref<number> = ref(0)
const cache: Ref<number> = ref(0)

const log: Ref<string> = ref('')

const hasSetDot: Ref<boolean> = ref(false)

function onNumClick(num: number) {
	if (cache.value + num > Number.MAX_SAFE_INTEGER) {
		return
	}
	if (lastOperation.value == '=') {
		cache.value = 0
		lastOperation.value = ''
	}
	if (hasSetDot.value) {
		cache.value = parseFloat(cache.value.toString() + '.' + num)
		hasSetDot.value = false
		return
	}
	cache.value = parseFloat(cache.value.toString() + num)
}

function onDotClick() {
	if (cache.value % 1 === 0) {
		hasSetDot.value = true
	}
}
const lastOperation = ref('')
const hasCalculatedAtLeastOnce = ref(false)

function calculate() {
	switch (lastOperation.value) {
		case '+':
			accumulator.value += cache.value
			break
		case '-':
			accumulator.value -= cache.value
			break
		case '*':
			accumulator.value *= cache.value
			break
		case '÷':
			accumulator.value /= cache.value
			break
		default:
			accumulator.value = cache.value
			break
	}
	log.value += lastOperation.value + ' ' + Math.round(cache.value * 100) / 100 + ' '
	if (hasCalculatedAtLeastOnce.value) {
		log.value = '(' + log.value + ') '
	}
	hasCalculatedAtLeastOnce.value = true
	cache.value = 0
}

function add() {
	calculate()
	lastOperation.value = '+'
}
function subtract() {
	calculate()
	lastOperation.value = '-'
}
function multiply() {
	calculate()
	lastOperation.value = '*'
}
function divide() {
	calculate()
	lastOperation.value = '÷'
}

const emit = defineEmits(['addToLog'])

function equals() {
	if (lastOperation.value == '=' || !hasCalculatedAtLeastOnce.value) {
		return
	}
	calculate()
	lastOperation.value = '='
	cache.value = accumulator.value
	accumulator.value = 0
	log.value = log.value + '= ' + cache.value
	hasCalculatedAtLeastOnce.value = false
	const logCopy = log.value
	log.value = ''
	emit('addToLog', logCopy)
}

function AC() {
	cache.value = 0
	accumulator.value = 0
	lastOperation.value = ''
	log.value = ''
	hasCalculatedAtLeastOnce.value = false
}
function del() {
	if (cache.value.toString().length > 1) {
		cache.value = parseFloat(cache.value.toString().slice(0, -1))
	} else {
		cache.value = 0
	}
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
	const key = event.key
	if (parseInt(key) >= 0 || parseInt(key) <= 9) {
		onNumClick(parseInt(key))
		return
	}
	switch (key) {
		case '+':
			add()
			break
		case '-':
			subtract()
			break
		case '*':
			multiply()
			break
		case '/':
			divide()
			break
		case '=':
			equals()
			break
		case 'Enter':
			equals()
			break
		case '.':
			onDotClick()
			break
		case 'Backspace':
			del()
			break
		case 'Escape':
			AC()
			break
		default:
			break
	}
})
</script>

<style scoped>
.buttons > button {
	@apply rounded-xl p-4 select-none text-xl;
}

.num {
	@apply bg-zinc-700;
}
.action {
	@apply bg-blue-300 text-black;
}
</style>
