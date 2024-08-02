<script>
	import Sidebar from '$lib/components/Sidebar.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let isEmployee = true;
</script>

<div class="container">
	<div class="sidebar">
		<Sidebar {isEmployee} />
	</div>
	<div class="main-content">
		<h1>Sign up</h1>
		<div class="make scooter">
			<form action="?/make_scooter" method="POST">
				<label for="latitude">Latitude</label>
				<input type="number" name="latitude" id="latitude" required /><br />

				<label for="longitude">Longitude</label>
				<input type="number" name="longitude" id="longitude" required /><br />

				<label for="checked_out">Checked Out</label>
				<input type="checkbox" name="checked_out" id="checked_out" /><br />

				<label for="need_repairs">Need Repairs</label>
				<input type="checkbox" name="need_repairs" id="need_repairs" /><br />

				<label for="battery">Battery (%)</label>
				<input type="number" name="battery" id="battery" min="0" max="100" required /><br />

				<button>Submit</button>
			</form>
		</div>

		<div class="make_user">
			<form action="?/make_user" method="POST">
				<label for="firstname">First Name</label>
				<input type="text" name="firstname" id="firstname" required /><br />

				<label for="lastname">Username</label>
				<input type="text" name="lastname" id="lastname" required /><br />

				<label for="email">Email</label>
				<input type="text" name="email" id="email" required /><br />

				<label for="is_employee">Is Employee?</label>
				<input type="checkbox" name="is_employee" id="is_employee" bind:value={isEmployee} /><br />

				{#if isEmployee}
					<label for="is_admin">Is Admin?</label>
					<input type="checkbox" name="is_admin" id="is_admin" /><br />
				{/if}

				<label for="password">Password</label>
				<input type="password" name="password" id="password" required /><br />

				<button>Submit</button>
			</form>
		</div>

		<div class="list_scooters">
			<table>
				<thead>
					<tr>
						<th>Latitude</th>
						<th>Longitude</th>
						<th>Checked Out</th>
						<th>Need Repairs</th>
						<th>Battery (%)</th>
					</tr>
				</thead>
				<tbody>
					{#each data.data.scooterList as scooter}
						<tr>
							<td>{scooter.latitude}</td>
							<td>{scooter.longitude}</td>
							<td>{scooter.checkedOut ? 'Yes' : 'No'}</td>
							<td>{scooter.needRepairs ? 'Yes' : 'No'}</td>
							<td>{scooter.battery}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="list_users">
			<table>
				<thead>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
				</thead>
				<tbody>
					{#each data.data.userList as user}
						<tr>
							<td>{user.firstname}</td>
							<td>{user.lastname}</td>
							<td>{user.email}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="list_transactions">
			<table>
				<thead>
					<th>Customer</th>
					<th>Amount</th>
				</thead>
				<body>
					{#each data.data.transactionList as transaction}
						<tr>
							<td>{transaction.customerId}</td>
							<td>{transaction.amount}</td>
						</tr>
					{/each}
				</body>
			</table>
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		height: 100vh; /* Full viewport height */
	}

	.sidebar {
		width: 250px; /* Adjust as needed */
		background-color: #f4f4f4;
		padding: 10px;
		border-right: 1px solid #ddd; /* Optional: Adds a border between sidebar and content */
	}

	.main-content div {
		border: 1px solid #ddd; /* Optional: Adds a border around each div */
	}

	.main-content {
		flex-grow: 1; /* Takes up the remaining space */
		padding: 10px;
	}
</style>
