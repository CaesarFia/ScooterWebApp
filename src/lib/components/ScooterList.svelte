<script lang="ts">
	export let scooters: { id: string, number: number, latitude: number, longitude: number, battery: number }[];
</script>

<div class="container">
	<h2 class="text-lg font-bold mb-4">Scooter List</h2>
	{#each scooters as scooter (scooter.id)}
		<div class="scooter-item">
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
	.button {
		@apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded;
	}
</style>
