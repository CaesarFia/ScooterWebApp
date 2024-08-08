<script lang="ts">
	import '$lib/css/app.css';

	export let data;
	const { user } = data;
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<div class="flex items-center space-x-3 rtl:space-x-reverse">
			<a href="/">
				<img src="src/lib/images/pasted-movie.png" class="h-8" alt="Vroom Logo" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
					>Vroom</span
				>
			</a>

            {#if user}
                <span class="text-sm text-gray-500 dark:text-gray-400">Welcome, <a href="/profile">{user.firstname}</a></span>
            {/if}
		</div>
		<button
			data-collapse-toggle="navbar-default"
			type="button"
			class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
			aria-controls="navbar-default"
			aria-expanded="false"
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="w-5 h-5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 17 14"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 1h15M1 7h15M1 13h15"
				/>
			</svg>
		</button>
		<div class="hidden w-full md:block md:w-auto" id="navbar-default">
			<ul
				class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
			>
				<li>
					<a
						href="/"
						class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						aria-current="page">Map</a
					>
				</li>
				{#if user}
					{#if user.balance !== null}
						<li>
							<a
								href="/balance"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>Balance</a
							>
						</li>
						<li>
							<a
								href="/history"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>History</a
							>
						</li>
					{/if}
					{#if user.role === 'admin' || user.role === 'employee'}
						<li>
							<a
								href="/dashboard"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
								>Dashboard</a
							>
						</li>
					{/if}
					<li>
						<form method="post" action="/?/signout">
							<button
								type="submit"
								class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
							>
								Sign Out
							</button>
						</form>
					</li>
				{:else}
					<li>
						<a
							href="/"
							class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
						>
							Sign In
						</a>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>

<div class="bg-emerald-400 h-full w-screen justify-center items-center">
	<slot />
</div>
