<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import ProfileCircle from '$lib/components/ProfileCircle.svelte';
	import Map from '$lib/components/MapComponent.svelte';
	import { isValidPassword } from '$lib/utils';
	import type { PageData } from './$types';

	export let data: PageData;

	let activeTab: 'signin' | 'signup' = 'signin';
	let password: string;
	let confirmPassword: string;
	let message: string | null = null;

	$: if (password && confirmPassword) {
		if (password !== confirmPassword) {
			message = 'Passwords do not match';
		} else if (!isValidPassword(password)) {
			message = 'Password must be at least 6 characters long';
		} else {
			message = null;
		}
	}

	const { user } = data;
	console.log(user);

	let isEmployee = user.isAdmin;
</script>

<main>
	<Map />
	{#if !user}
		<div
			class="LoginPopUp flex h-screen items-center justify-center z-10 backdrop-blur-sm transition:fade"
		>
			<div
				id="LoginPopUp"
				class="absolute flex flex-col items-center justify-center bg-sidebar-dark-primary border border-emerald-200 rounded-xl w-96 transition:fly={{
					y: -500
				}}"
			>
				<div class="rounded-lg w-96">
					<img
						src="src/lib/images/pasted-movie.png"
						alt="Zoom logo"
						class="relative flex justify-center w-14 mt-5 ml-40 h-8 items-center"
					/>
					<div class="flex justify-around mb-4">
						<button
							on:click={() => (activeTab = 'signin')}
							class="text-lg font-semibold text-white"
							class:tab-active={activeTab === 'signin'}
						>
							Sign In
						</button>
						<button
							on:click={() => (activeTab = 'signup')}
							class="text-lg font-semibold text-white"
							class:tab-active={activeTab === 'signup'}
						>
							Sign Up
						</button>
					</div>
				</div>
				<div
					class="w-1/3 border-b-2 border-emerald-200 transition-all duration-300"
					style="transform: translateX({activeTab === 'signup' ? '75%' : '-75%'});"
				></div>

				{#if message}
					<div class="error">{message}</div>
				{/if}
				<!-- Sign In Form -->
				{#if activeTab === 'signin'}
					<form method="POST" action="?/signin">
						<div class="relative flex items-center mt-6">
							<span class="absolute">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<input
								type="email"
								name="email"
								class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-emerald-300 dark:focus:border-blue-300 focus:ring-emerald-200 focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Email address"
								required
							/>
						</div>
						<div class="relative flex items-center mt-4">
							<span class="absolute">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</span>

							<input
								type="password"
								name="password"
								bind:value={password}
								class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-emerald-300 dark:focus:border-blue-300 focus:ring-emerald-200 focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Password"
								required
							/>
						</div>
						<div class="mt-6">
							<button
								name="signinButton"
								class="w-full px-6 py-3 text-sm font-medium tracking-wide shadow-md text-white capitalize transition-colors duration-300 transform bg-emerald-400 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
							>
								Sign In
							</button>
						</div>
					</form>
				{/if}

				<!-- Sign Up Form -->
				{#if activeTab === 'signup'}
					<form method="POST" action="?/signup">
						<div class="relative flex items-center mt-6">
							<span class="absolute">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</span>
							<input
								type="email"
								name="email"
								class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-emerald-300 dark:focus:border-blue-300 focus:ring-emerald-200 focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Email address"
							/>
						</div>
						<div class="relative flex items-center mt-6">
							<input
								type="text"
								name="firstname"
								class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-emerald-300 dark:focus:border-blue-300 focus:ring-emerald-200 focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="First name"
							/>
						</div>
						<div class="relative flex items-center mt-6">
							<input
								type="text"
								name="lastname"
								class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-emerald-300 dark:focus:border-blue-300 focus:ring-emerald-200 focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Last name"
							/>
						</div>
						<div class="relative flex items-center mt-4">
							<span class="absolute">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</span>

							<input
								type="password"
								bind:value={password}
								name="password"
								class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-emerald-300 dark:focus:border-blue-300 focus:ring-emerald-200 focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Password"
							/>
						</div>
						<div class="relative flex items-center mt-4">
							<span class="absolute">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
									/>
								</svg>
							</span>
							<input
								type="password"
								bind:value={confirmPassword}
								name="confirmPassword"
								class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-emerald-300 dark:focus:border-blue-300 focus:ring-emerald-200 focus:outline-none focus:ring focus:ring-opacity-40"
								placeholder="Confirm Password"
							/>
						</div>
						<div class="mt-6">
							<button
								name="signupButton"
								class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-400 rounded-lg hover:bg-emerald-200 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
							>
								Sign Up
							</button>
						</div>
					</form>
				{/if}
			</div>
		</div>
	{:else}
		<Sidebar {isEmployee} />
		<ProfileCircle />
	{/if}
</main>
