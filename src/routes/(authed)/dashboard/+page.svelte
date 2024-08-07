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
						step=".000001"
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

					<label class="block text-tc text-sm font-medium mb-2" for="model">Model</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="text"
						name="model"
						id="model"
						required
					/><br />

					<label class="block text-tc text-sm font-medium mb-2" for="year">Year Purchased</label>
					<input
						class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
						type="number"
						name="year"
						id="year"
						value=2024
						min=0
						max=2024
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
					<div class="w-full table text-tc border-separate border-spacing-2">
						<thead>
							<tr class="bg-tc table-row text-white border-spacing-0">
								<th class="p-4 table-cell border border-gray-300 rounded-md">Latitude</th>
								<th class="p-4 table-cell border border-gray-300 rounded-md">Longitude</th>
								<th class="p-4 table-cell border border-gray-300 rounded-md">Checked Out</th>
								<th class="p-4 table-cell border border-gray-300 rounded-md">Need Repairs</th>
								<th class="p-4 table-cell border border-gray-300 rounded-md">Battery (%)</th>
								<th class="p-4 table-cell border border-gray-300 rounded-md">Year Purchased</th>
								<th class="p-4 table-cell border border-gray-300 rounded-md">Model</th>
							</tr>
						</thead>
						<tbody>
							{#each data.scooterList as scooter}
								<form class="table-row bg-gray-800 text-white" action="?/update_scooter" method="POST">
									<td><input class="w-f text-center bg-gray-800 text-white" 
									type="number"
									name="latitude"
									min="-180"
									max="180"
									step=.000001
									value={scooter.latitude}/></td>
									<td><input class="w-f text-center bg-gray-800 text-white" 
									type="number"
									name="longitude"
									min="-180"
									max="180"
									step=.000001
									value={scooter.longitude}/></td>
									<td><button type="button" class="w-full" on:click={() => scooter.checkedOut = !scooter.checkedOut}>{scooter.checkedOut ? 'Yes' : 'No'}</button></td>
									<td class=""><button type="button" class="w-full" on:click={() => scooter.needRepairs = !scooter.needRepairs}>{scooter.needRepairs ? 'Yes' : 'No'}</button></td>
									<td><input class="w-f text-center bg-gray-800 text-white" 
										type="number"
										name="battery"
										min=0
										max="100"
										step=1
										value={scooter.battery}/></td>
									<td class="w-f text-center">{scooter.yearPurchased}</td>
									<td class="w-f text-center">{scooter.model}</td>
									<td class="bg-charcoal">
										<input type="hidden" name="id" value={scooter.id}/>
										<input type="hidden" name="checked_out" bind:value={scooter.checkedOut}/>
										<input type="hidden" name="need_repairs" bind:value={scooter.needRepairs}/>
									<button type="submit" class="px-4 py-2 bg-tc text-white font-semibold rounded-md shadow-sm focus:outline-none hover:opacity-80">Update</button></td>
								</form>
							{/each}
					</div>
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
								<th class="p-4 border border-gray-300 rounded-md">Account Type</th>
							</tr>
						</thead>
						<tbody>
							{#each data.customerList as user}
								<tr class="bg-gray-800 text-white">
									<td>{user.users.firstname}</td>
									<td>{user.users.lastname}</td>
									<td>{user.users.email}</td>
									<td>Customer</td>
								</tr>
							{/each}
							{#each data.employeeList as user}
								<tr class="bg-gray-800 text-white">
									<td>{user.users.firstname}</td>
									<td>{user.users.lastname}</td>
									<td>{user.users.email}</td>
									<td>{user.employees.isAdmin ? "Admin" : "Employee"}</td>
									<td class="bg-charchoal">
									<form class="bg-charchoal" action="?/delete_user" method="POST">
										<input type="hidden" name="id" value = {user.users.id}/>
										<button type="submit" class="px-4 py-2 bg-tc text-white font-semibold rounded-md shadow-sm focus:outline-none hover:opacity-80">Delete</button>
									</form>
									</td>
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
							{#each data.transactionList as transaction}
								<tr class="bg-gray-800 text-white">
									<td>{transaction.customerId}</td>
									<td>{transaction.amount}</td>
								</tr>
							{/each}
						</body>
					</table>
				</div>

				<div
					class="rounded-lg bg-charcoal border-tc border-solid border-2 p-10 overflow-y-auto h-1/4"
					id="list_transactions"
				>
					<h2 class="text-xl font-bold text-tc">Approve Rentals</h2>
					<table class="w-full text-tc border-separate border-spacing-2">
						<thead>
							<tr class="bg-tc text-white">
								<th class="p-4 border border-gray-300 rounded-md">Customer</th>
								<th class="p-4 border border-gray-300 rounded-md">Scooter</th>
								<th class="p-4 border border-gray-300 rounded-md">Mileage</th>
								<th class="p-4 border border-gray-300 rounded-md">Start Time</th>
								<th class="p-4 border border-gray-300 rounded-md">End Time</th>
								<th class="bg-charcoal"></th>
							</tr>
						</thead>
						<tbody>
							{#each data.rentalList as rental}
								<tr class="bg-gray-800 text-white">
									<td>{rental.customerId}</td>
									<td>{rental.scooterId}</td>
									<td>{rental.mileage}</td>
									<td>{rental.startTime}</td>
									<td>{rental.endTime}</td>
									{#if !rental.approverId}
									<td class="bg-charcoal"> 
										<form method="post" action="?/approve_rental">
										<input type="hidden" name="id" bind:value={rental.id} />
										<button type="submit"
										class="w-full px-4 py-2 bg-tc text-white font-semibold rounded-md shadow-sm focus:outline-none hover:opacity-80"
										>Approve</button
									></form></td>
									{/if}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
