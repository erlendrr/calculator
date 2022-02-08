import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

export interface Person {
	fName: string
	lName: string
	email: string
}

export interface State {
	person: Person
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
	state() {
		return {
			person: {
				fName: '',
				lName: '',
				email: '',
			},
		}
	},
	mutations: {
		setPerson(state, person: Person) {
			state.person = person
		},
	},
})
