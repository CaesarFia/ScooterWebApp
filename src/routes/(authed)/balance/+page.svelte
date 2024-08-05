<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';

	export let data;
	let isEmployee = data.user?.isAdmin;
</script>

<div class="flex justify-center items-center min-h-screen bg-gray-900">
	<Sidebar {isEmployee} />
	<form
		class="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md"
		action="?/add_balance"
		method="POST"
	>
		<div class="mb-4 text-center">
			<p>Your balance is: <span class="font-bold">{data.data.currentBalance}</span></p>
		</div>

		<div class="flex items-center space-x-2">
			<input
				type="number"
				name="amount"
				step="0.01"
				placeholder="Add balance"
				class="w-full px-4 py-2 text-gray-800 bg-gray-100 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
			/>
			<button
				type="submit"
				class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring"
			>
				✓
			</button>
		</div>
	</form>
</div>
