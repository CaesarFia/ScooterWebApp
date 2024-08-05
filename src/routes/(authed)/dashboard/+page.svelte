<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { locations } from '$lib/db/schema';

	export let data;

	let selectedLocation = locations[0];
	let latitude: number;
	let longitude: number;

	$: latitude = selectedLocation.latitude;
	$: longitude = selectedLocation.longitude;

	const isEmployee = true;
	
	let isEmployeeChecked = false;
</script>

<div class="flex flex-row bg-gray-900">
	<div class="basis-72">
		<Sidebar {isEmployee} />
	</div>

	<div class="basis-10/12 flex flex-row pt-0">
		<div class="basis-2/6 p-10 space-y-5 pt-0">
			<div class="rounded-lg bg-charcoal border-tc border-solid border-2 p-10" id="make_scooter">
				<form class="space-y-3" action="?/make_scooter" method="POST">
					<h2 class="text-xl font-bold text-tc">Add Scooter</h2>
					<select id="location" bind:value={selectedLocation} class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm">
						{#each locations as location}
							<option value={location}>
								{location.name}
							</option>
						{/each}
					</select><br />
					<label class="block text-tc text-sm font-medium mb-2" for="latitude">Latitude</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="number"
						name="latitude"
						min="-180"
						max="180"
						bind:value={latitude}
						step="any"
						id="latitude"
						required
					/><br />

					<label class="block text-tc text-sm font-medium mb-2" for="longitude">Longitude</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="number"
						name="longitude"
						min="-180"
						max="180"
						step=".000001"
						bind:value={longitude}
						id="longitude"
						required
					/><br />

					<label class=" block text-tc text-sm font-medium mb-2" for="checked_out"
						>Checked Out</label
					>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="checkbox"
						name="checked_out"
					/><br />

					<label class="block text-tc text-sm font-medium mb-2" for="need_repairs"
						>Need Repairs</label
					>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="checkbox"
						name="need_repairs"
					/><br />

					<label class="block text-tc text-sm font-medium mb-2" for="battery">Battery (%)</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="number"
						name="battery"
						min="0"
						max="100"
						required
					/><br />

					<button
						class="w-full px-4 py-2 bg-tc text-white font-semibold rounded-md shadow-sm focus:outline-none hover:opacity-80"
						>Submit</button
					>
				</form>
			</div>

			<div class="rounded-lg bg-charcoal border-tc border-solid border-2 p-10" id="make_user">
				<form class="space-y-3" action="?/make_user" method="POST">
					<h2 class="text-xl font-bold text-tc">Add User</h2>
					<label class=" block text-tc text-sm font-medium mb-2" for="firstname">First Name</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="text"
						name="firstname"
						id="firstname"
						required
					/><br />

					<label class="block text-tc text-sm font-medium mb-2" for="lastname">Username</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="text"
						name="lastname"
						id="lastname"
						required
					/><br />

					<label class="block text-tc text-sm font-medium mb-2" for="email">Email</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="text"
						name="email"
						id="email"
						required
					/><br />

					<label class="block text-tc text-sm font-medium mb-2" for="is_employee"
						>Is Employee?</label
					>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="checkbox"
						name="is_employee"
						id="is_employee"
						bind:value={isEmployeeChecked}
					/><br />

					{#if isEmployeeChecked}
						<label class="block text-tc text-sm font-medium mb-2" for="is_admin">Is Admin?</label>
						<input
							class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
							type="checkbox"
							name="is_admin"
							id="is_admin"
						/><br />
					{/if}

					<label class="block text-tc text-sm font-medium mb-2" for="password">Password</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="password"
						name="password"
						id="password"
						required
					/><br />

					<button
						class="w-full px-4 py-2 bg-tc text-white font-semibold rounded-md shadow-sm focus:outline-none hover:opacity-80"
						>Submit</button
					>
				</form>
			</div>
		</div>

		<div class="basis-4/6 p-10 h-screen pt-0">
			<div class="space-y-5 h-full flex flex-col">
				<div
					class="rounded-lg bg-charcoal border-tc border-solid border-2 p-10 overflow-y-auto h-1/4"
					id="list_scooters"
				>
					<h2 class="text-xl font-bold text-tc">Scooters</h2>
					<table class="w-full text-tc border-separate border-spacing-2">
						<thead>
							<tr class="bg-tc text-white border-spacing-0">
								<th class="p-4 border border-gray-300 rounded-md">Latitude</th>
								<th class="p-4 border border-gray-300 rounded-md">Longitude</th>
								<th class="p-4 border border-gray-300 rounded-md">Checked Out</th>
								<th class="p-4 border border-gray-300 rounded-md">Need Repairs</th>
								<th class="p-4 border border-gray-300 rounded-md">Battery (%)</th>
							</tr>
						</thead>
						<tbody>
							{#each data.data.scooterList as scooter}
								<tr class="bg-gray-800 text-white">
									<td class="">{scooter.latitude}</td>
									<td class="">{scooter.longitude}</td>
									<td class="">{scooter.checkedOut ? 'Yes' : 'No'}</td>
									<td class="">{scooter.needRepairs ? 'Yes' : 'No'}</td>
									<td class="">{scooter.battery}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div
					class="rounded-lg bg-charcoal border-tc border-solid border-2 p-10 overflow-y-auto h-1/4"
					id="list_users"
				>
					<h2 class="text-xl font-bold text-tc">Users</h2>
					<table class="w-full text-tc border-separate border-spacing-2">
						<thead>
							<tr class="bg-tc text-white">
								<th class="p-4 border border-gray-300 rounded-md">First Name</th>
								<th class="p-4 border border-gray-300 rounded-md">Last Name</th>
								<th class="p-4 border border-gray-300 rounded-md">Email</th>
							</tr>
						</thead>
						<tbody>
							{#each data.data.userList as user}
								<tr class="bg-gray-800 text-white">
									<td>{user.firstname}</td>
									<td>{user.lastname}</td>
									<td>{user.email}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<div
					class="rounded-lg bg-charcoal border-tc border-solid border-2 p-10 overflow-y-auto h-1/4"
					id="list_transactions"
				>
					<h2 class="text-xl font-bold text-tc">Transactions</h2>
					<table class="w-full text-tc border-separate border-spacing-2">
						<thead>
							<tr class="bg-tc text-white">
								<th class="p-4 border border-gray-300 rounded-md">Customer</th>
								<th class="p-4 border border-gray-300 rounded-md">Amount</th>
							</tr>
						</thead>
						<body>
							{#each data.data.transactionList as transaction}
								<tr class="bg-gray-800 text-white">
									<td>{transaction.customerId}</td>
									<td>{transaction.amount}</td>
								</tr>
							{/each}
						</body>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
