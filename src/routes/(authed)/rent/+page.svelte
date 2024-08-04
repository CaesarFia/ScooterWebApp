<script lang="ts">
	export let data;

	const scooters = data.data.scooterList;

	type Location = {
		name: string;
		latitude: number;
		longitude: number;
	};
	const locations: Location[] = [
		{ name: 'Malachowsky', latitude: 29.644323, longitude: -82.347999 },
		{ name: 'Hume Hall', latitude: 29.64478, longitude: -82.351581 },
		{ name: 'Turlington', latitude: 29.649078, longitude: -82.343826 },
		{ name: 'Carelton Auditorium', latitude: 29.649027, longitude: -82.341442 },
		{ name: 'Reitz Union', latitude: 29.64671, longitude: -82.347624 },
		{ name: 'Flavet Field', latitude: 29.647132, longitude: -82.353396 },
		{ name: "O'Connell Center", latitude: 29.649447, longitude: -82.350279 },
		{ name: 'Shands', latitude: 29.639535, longitude: -82.343739 },
		{ name: 'Broward Hall', latitude: 29.646864, longitude: 82.342221 },
		{ name: 'Gator Corner', latitude: 29.648277, longitude: -82.350027 },
		{ name: 'Campus cravings', latitude: 29.650039, longitude: -82.346129 }
	];

	const locationMap = new Map();

	const locationLookup = new Map(
		locations.map((location) => [`${location.latitude},${location.longitude}`, location.name])
	);

	const scooterLocationMap = new Map(
		scooters.map((scooter) => [
			scooter.id,
			locationLookup.get(`${scooter.latitude},${scooter.longitude}`)
		])
	);
</script>

<div class="container">
	<h2 class="text-lg font-bold mb-4">Scooter List</h2>
	{#each scooters as scooter (scooter.id)}
		<div class="scooter-item">
			<div>
				<div>{scooterLocationMap.get(scooter.id)}</div>
				<div>Battery: {scooter.battery}%</div>
			</div>
			<form method="POST" action="?/make_rental">
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
