<script lang="ts">
	import type { Scooter } from "$lib/db/schema";
	export let scooterList: Scooter[];
	export let selectedScooter: Scooter | null = null;
</script>

<div class="container">
	<h2 class="text-lg font-bold mb-4">Scooter List</h2>
	{#each scooterList as scooter (scooter.id)}
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
