<script lang="ts">
	import { type Scooter } from "$lib/db/schema";
	export let scooterList: Scooter[];
	export let filteredScooterList: Scooter[];
	export let selectedScooter: Scooter | null = null;

	let search: string = "";

	$: if (scooterList || search) {
		filteredScooterList = scooterList;
		if (search) {
			const filters = search.split(' ');
			for (const filter of filters) {
				if (filter.includes("=")) {
					const kv = filter.split("=")
					const key = kv[0];
					const value = kv[1];
					filteredScooterList = filteredScooterList.filter(scooter => { 
						if (!(key in scooter)) {
							return false
						}

						return scooter[key].toString() === value;
					});
				}
				else {
					filteredScooterList = filteredScooterList.filter(scooter => {
						for (const key in scooter) {
							if (scooter[key].toString().includes(filter)) {
								return true;
							}
						}
						return false;
					})
				}
			}
		}
	}	
</script>

<div class="container">
	<h2 class="text-lg font-bold mb-4">Scooter List</h2>
	<input
		class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
		type="text"
		name="search"
		bind:value={search}
	/>
	{#each filteredScooterList as scooter (scooter.id)}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="scooter-item {scooter.id === selectedScooter?.id ? 'selected' : ''}"
			on:click={() => {
				selectedScooter = scooter;
			}}
		>
			<div>
				<div>{scooter.latitude}, {scooter.longitude}</div>
				<div>Battery: {scooter.battery}%</div>
			</div>
			<form method="POST" action="/rent?/make_rental">
				<input type="hidden" name="scooterId" value={scooter.id} />
				<button class="button">Rent</button>
			</form>
		</div>
	{/each}
</div>

<style>
	.container {
		@apply fixed right-0 top-0 mt-4 mr-4 p-4 w-80 bg-gray-800 text-white rounded-lg shadow-lg;
	}
	.scooter-item {
		@apply flex justify-between items-center py-2 px-4 bg-gray-700 rounded-lg mb-2;
	}

	.selected {
		@apply outline;
	}

	.button {
		@apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded;
	}
</style>
