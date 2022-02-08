<template>
	<div class="mx-auto text-center p-4 rounded-xl text-lg min-w-[20rem] w-full max-w-lg">
		<router-link
			class="bg-slate-700 m-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md hover:bg-grape-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grape-500"
			to="/"
			>Home</router-link
		>
		<h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Contact</h2>

		<form
			v-if="status == '' || status == 'error'"
			@submit.prevent="submit"
			method="POST"
			class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
		>
			<div>
				<label for="first-name" class="block text-sm font-medium text-white">First name</label>
				<div class="mt-1">
					<input
						required
						ref="fNameRef"
						v-model="person.fName"
						type="text"
						name="first-name"
						id="first-name"
						class="bg-slate-800 text-white lock w-full shadow-sm sm:text-sm focus:ring-grape-500 focus:border-slate-800 border border-slate-600 rounded-md"
					/>
				</div>
			</div>
			<div>
				<label for="last-name" class="block text-sm font-medium text-white">Last name</label>
				<div class="mt-1">
					<input
						required
						ref="lNameRef"
						v-model="person.lName"
						type="text"
						name="last-name"
						id="last-name"
						class="bg-slate-800 text-white lock w-full shadow-sm sm:text-sm focus:ring-grape-500 focus:border-slate-800 border border-slate-600 rounded-md"
					/>
				</div>
			</div>
			<div class="sm:col-span-2">
				<label for="email" class="block text-sm font-medium text-white">Email</label>
				<div class="mt-1">
					<input
						required
						ref="emailRef"
						v-model="person.email"
						id="email"
						name="email"
						type="email"
						class="bg-slate-800 text-white lock w-full shadow-sm sm:text-sm focus:ring-grape-500 focus:border-slate-800 border border-slate-600 rounded-md"
					/>
				</div>
			</div>

			<div class="sm:col-span-2">
				<div class="flex justify-between">
					<label for="how-can-we-help" class="block text-sm font-medium text-white">How can we help you?</label>
					<span id="how-can-we-help-description" class="text-sm text-gray-400"
						>Max. {{ MAX_MESSAGE_LENGTH }} characters</span
					>
				</div>
				<div class="mt-1">
					<textarea
						required
						ref="messageRef"
						v-model="message"
						id="how-can-we-help"
						name="how-can-we-help"
						aria-describedby="how-can-we-help-description"
						rows="4"
						class="bg-slate-800 text-white lock w-full shadow-sm sm:text-sm focus:ring-grape-500 focus:border-slate-800 border border-slate-600 rounded-md"
					/>
				</div>
			</div>

			<div class="text-right sm:col-span-2">
				<button
					type="submit"
					class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md hover:bg-grape-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grape-500"
					:class="showButton ? 'bg-slate-700' : 'bg-slate-500 text-slate-400 select-none pointer-events-none'"
				>
					Submit
				</button>
			</div>
		</form>
		<div v-if="status == 'sending'">Sending...</div>
		<div v-if="status == 'sent'">Success!</div>
	</div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, reactive, ref, watch } from 'vue'
import { key, Person } from '../store/index'
const store = useStore(key)

const MAX_MESSAGE_LENGTH = ref(500)

const fNameRef = ref(null)
const lNameRef = ref(null)
const emailRef = ref(null)
const messageRef = ref(null)

let person = reactive<Person>({
	fName: '',
	lName: '',
	email: '',
})

person = store.state.person

const message = ref('')

function isValid() {
	return (
		fNameRef.value.checkValidity() &&
		lNameRef.value.checkValidity() &&
		emailRef.value.checkValidity() &&
		message.value.length > 0
	)
}

const showButton = ref(false)

watch(person, () => {
	store.commit('setPerson', person)
	console.log(store.state.person)
	showButton.value = isValid()
})

watch(message, () => {
	showButton.value = isValid()
	if (message.value.length >= MAX_MESSAGE_LENGTH.value) {
		console.log(message.value)
		message.value = message.value.slice(0, -1)
	}
})
type Status = '' | 'sending' | 'sent' | 'error'
const status = ref<Status>('')

async function submit(e: Event) {
	status.value = 'sending'
	console.log(status.value)
	setTimeout(() => {
		status.value = 'sent'
		console.log(status.value)
	}, 2000)
}
</script>
