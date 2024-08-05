<script lang="ts">
	import ScooterList from "$lib/components/ScooterList.svelte";

	export let data;

	const { data: { scooterList } } = data;
</script>

<ScooterList scooters={scooterList} />

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
