<template>
	<div class="mx-auto text-center p-4 rounded-xl text-lg min-w-[20rem] w-full max-w-lg">
		<h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Let's work together</h2>

		<form action="#" method="POST" class="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
			<div>
				<label for="first-name" class="block text-sm font-medium text-white">First name</label>
				<div class="mt-1">
					<input
						required
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
					<span id="how-can-we-help-description" class="text-sm text-gray-400">Max. 500 characters</span>
				</div>
				<div class="mt-1">
					<textarea
						required
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
					class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-700 hover:bg-grape-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-grape-500"
				>
					Submit
				</button>
			</div>
		</form>
	</div>
</template>