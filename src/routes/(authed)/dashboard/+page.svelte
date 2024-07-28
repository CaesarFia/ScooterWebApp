<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Scooter Form</title>
		<link
			href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
			rel="stylesheet"
		/>
	</head>
	<div>
		<div class="max-w-4xl mx-auto bg-white p-8 rounded shadow-md relative">
			<h2 class="text-2xl font-bold mb-6">Scooter List</h2>
			<button
				id="openAddScooterPopup"
				class="top-0 left-0 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>
				Add Scooter
			</button>
			<!-- Add Scooter button in the top left corner -->
			<ul id="scooterList" class="space-y-4">
				<!-- Scooter items will be dynamically added here -->
			</ul>
		</div>

		<!-- Add Scooter Form Popup -->
		<div
			id="addScooterPopup"
			class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 hidden"
		>
			<iv class="max-w-lg mx-auto bg-white p-8 rounded shadow-md relative">
				<!-- Close button for the popup -->
				<button
					id="closeAddScooterPopup"
					onclick="closeAddScooterPopup()"
					class="absolute top-0 right-0 mt-2 mr-2 bg-gray-300 text-gray-700 rounded-md px-2 py-1 hover:bg-gray-400 focus:outline-none"
				>
					X
				</button>
				<h2 class="text-2xl font-bold mb-6">Add New Scooter</h2>
				<form id="scooterForm" class="space-y-4">
					<div>
						<label for="latitude" class="block text-sm font-medium text-gray-700">Latitude</label>
						<input
							type="number"
							id="latitude"
							name="latitude"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label for="longitude" class="block text-sm font-medium text-gray-700">Longitude</label>
						<input
							type="number"
							id="longitude"
							name="longitude"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div class="flex items-center">
						<input
							type="checkbox"
							id="checkedOut"
							name="checkedOut"
							class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
						/>
						<label for="checkedOut" class="ml-2 block text-sm text-gray-900">Checked Out</label>
					</div>
					<div class="flex items-center">
						<input
							type="checkbox"
							id="needRepairs"
							name="needRepairs"
							class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
						/>
						<label for="needRepairs" class="ml-2 block text-sm text-gray-900">Need Repairs</label>
					</div>
					<div>
						<label for="battery" class="block text-sm font-medium text-gray-700">Battery</label>
						<input
							type="number"
							id="battery"
							name="battery"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div class="flex justify-end">
						<button
							type="button"
							onclick="addScooter()"
							class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Submit
						</button>
					</div>
				</form>
			</iv>
		</div>
	</div>

	<!-- Main content -->
	<div class="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
		<h2 class="text-2xl font-bold mb-6">User List</h2>
		<button
			id="openAddUserPopup"
			class="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
			>Add User</button
		>
		<ul id="userList" class="space-y-4">
			<!-- User items will be dynamically added here -->
		</ul>
	</div>

	<!-- Add User Popup -->
	<div
		id="addUserPopup"
		class="hidden fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
	>
		<div class="max-w-lg mx-auto bg-white p-8 rounded shadow-md relative">
			<button
				id="closeAddUserPopup"
				class="absolute top-0 right-0 -mt-6 -mr-6 text-gray-600 hover:text-gray-900 focus:outline-none"
				aria-label="Close"
			>
				<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>
			<div class="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
				<h2 class="text-2xl font-bold mb-6">Create New User</h2>
				<form id="userForm" class="space-y-4">
					<div>
						<label for="firstname" class="block text-sm font-medium text-gray-700">First Name</label
						>
						<input
							type="text"
							id="firstname"
							name="firstname"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label for="lastname" class="block text-sm font-medium text-gray-700">Last Name</label>
						<input
							type="text"
							id="lastname"
							name="lastname"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
						/>
					</div>
					<div>
						<button
							type="button"
							onclick="submitUserForm()"
							class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>Submit</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>

	<!-- Transactions Popup (for demonstration, adjust as needed) -->
	<div class="max-w-4xl mx-auto bg-white p-8 rounded shadow-md mt-8">
		<h2 class="text-2xl font-bold mb-6">Transactions</h2>
		<ul id="transactionList" class="space-y-4">
			<!-- Transaction items will be dynamically added here -->
			<li class="bg-gray-50 p-4 rounded-md shadow">
				<div class="flex justify-between"></div>
			</li>
		</ul>
	</div>

	<script>
		// Function to show the add scooter popup
		document.getElementById('openAddScooterPopup').addEventListener('click', function () {
			document.getElementById('addScooterPopup').classList.remove('hidden');
		});

		// Function to close the add scooter popup
		function closeAddScooterPopup() {
			document.getElementById('addScooterPopup').classList.add('hidden');
		}

		// Function to add scooter (placeholder for actual logic)
		function addScooter() {
			// Implement your logic to handle form submission here
			// Example: You can access form fields using document.getElementById('fieldId').value
			// For now, let's just close the popup
			closeAddScooterPopup();
		}
		const transactions = [
			{
				id: 1,
				customer_id: 101,
				scooter_id: 501,
				employee_id: 301,
				amount: 45.0,
				check_in_time: '2023-07-01 10:00:00',
				check_out_time: '2023-07-01 12:00:00'
			},
			{
				id: 2,
				customer_id: 102,
				scooter_id: 502,
				employee_id: 302,
				amount: 15.0,
				check_in_time: '2023-07-02 11:00:00',
				check_out_time: '2023-07-02 13:00:00'
			}
		];

		const scooters = [
			{
				id: 4,
				longitude: 2,
				latitude: 3,
				checkOut: true,
				needRepairs: false,
				battery: 44
			}
		];

		document.getElementById('openAddScooterPopup').addEventListener('click', function () {
			document.getElementById('addScooterPopup').classList.remove('hidden');
		});

		// Function to close the add scooter popup
		function closeAddScooterPopup() {
			document.getElementById('addScooterPopup').classList.add('hidden');
		}

		// Function to add scooter (placeholder for actual logic)
		function addScooter() {
			// Implement your logic to handle form submission here
			// Example: You can access form fields using document.getElementById('fieldId').value
			// For now, let's just close the popup
			closeAddScooterPopup();
		}

		function addScooter() {
			const latitude = document.getElementById('latitude').value;
			const longitude = document.getElementById('longitude').value;
			const checkedOut = document.getElementById('checkedOut').checked;
			const needRepairs = document.getElementById('needRepairs').checked;
			const battery = document.getElementById('battery').value;

			const newScooter = {
				id: scooters.length + 1, // Generate unique ID (replace with actual ID mechanism)
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				checkedOut,
				needRepairs,
				battery: parseFloat(battery)
			};

			scooters.push(newScooter);
			loadScooters(); // Reload scooter list
			clearForm(); // Clear form fields
		}

		function toggleForm() {
			const form = document.getElementById('scooterForm');
			form.style.display = form.style.display === 'none' ? 'block' : 'none';
		}

		function closeForm() {
			const form = document.getElementById('scooterForm');
			form.style.display = 'none';
		}

		function loadScooters() {
			const scooterList = document.getElementById('scooterList');
			scooterList.innerHTML = '';

			scooters.forEach((scooter) => {
				const listItem = document.createElement('li');
				listItem.className = 'bg-gray-50 p-4 rounded-md shadow';
				listItem.innerHTML = `
            <div class="flex justify-between">
                <div>
                    <p class="text-sm font-medium text-gray-700">ID: <span class="font-semibold">${scooter.id}</span></p>
                    <p class="text-sm font-medium text-gray-700">Latitude: <span class="font-semibold">${scooter.latitude}</span></p>
                    <p class="text-sm font-medium text-gray-700">Longitude: <span class="font-semibold">${scooter.longitude}</span></p>
                    <p class="text-sm font-medium text-gray-700">Checked Out: <span class="font-semibold">${scooter.checkedOut ? 'Yes' : 'No'}</span></p>
                    <p class="text-sm font-medium text-gray-700">Need Repairs: <span class="font-semibold">${scooter.needRepairs ? 'Yes' : 'No'}</span></p>
                    <p class="text-sm font-medium text-gray-700">Battery: <span class="font-semibold">${scooter.battery}</span></p>
                </div>
                <div class="flex items-center">
                    <button
                        type="button"
                        class="ml-2 text-red-600 hover:text-red-800"
                        onclick="deleteScooter(${scooter.id})"
                    >
                        Delete
                    </button>
                </div>
            </div>
        `;
				scooterList.appendChild(listItem);
			});
		}

		function deleteScooter(scooterId) {
			scooters = scooters.filter((scooter) => scooter.id !== scooterId);
			loadScooters();
		}

		function clearForm() {
			document.getElementById('latitude').value = '';
			document.getElementById('longitude').value = '';
			document.getElementById('checkedOut').checked = false;
			document.getElementById('needRepairs').checked = false;
			document.getElementById('battery').value = '';
		}

		document.getElementById('openAddScooterPopup').addEventListener('click', function () {
			document.getElementById('addScooterPopup').classList.toggle('hidden');
		});

		function loadTransactions() {
			const transactionList = document.getElementById('transactionList');
			transactionList.innerHTML = ''; // Clear existing list

			transactions.forEach((transaction) => {
				const listItem = document.createElement('li');
				listItem.className = 'bg-gray-50 p-4 rounded-md shadow';
				listItem.innerHTML = `
          <div class="flex justify-between">
            <div>
              <p class="text-sm font-medium text-gray-700">Transaction ID: <span class="font-semibold">${transaction.id}</span></p>
              <p class="text-sm font-medium text-gray-700">Customer ID: <span class="font-semibold">${transaction.customer_id}</span></p>
              <p class="text-sm font-medium text-gray-700">Scooter ID: <span class="font-semibold">${transaction.scooter_id}</span></p>
              <p class="text-sm font-medium text-gray-700">Employee ID: <span class="font-semibold">${transaction.employee_id}</span></p>
            </div>
            <div class="text-right">
              <p class="text-sm font-medium text-gray-700">Amount: <span class="font-semibold">$${transaction.amount.toFixed(2)}</span></p>
              <p class="text-sm font-medium text-gray-700">Check-In Time: <span class="font-semibold">${transaction.check_in_time}</span></p>
              <p class="text-sm font-medium text-gray-700">Check-Out Time: <span class="font-semibold">${transaction.check_out_time}</span></p>
            </div>
          </div>
        `;
				transactionList.appendChild(listItem);
			});
		}

		const users = [
			{
				id: 1,
				firstname: 'King',
				lastname: 'Bob',
				email: 'kingbob@minion.com',
				credit: 100.0,
				is_admin: true
			},
			{
				id: 2,
				firstname: 'Snoop',
				lastname: 'Dog',
				email: 'snoopsnoop@gotthatdawginem.com',
				credit: 50.0,
				is_admin: false
			}
		];

		function loadUsers() {
			const userList = document.getElementById('userList');
			userList.innerHTML = '';

			users.forEach((user) => {
				const listItem = document.createElement('li');
				listItem.className = 'bg-gray-50 p-4 rounded-md shadow flex justify-between items-center';
				listItem.innerHTML = `
          <div>
            <p class="text-sm font-medium text-gray-700">ID: <span class="font-semibold">${user.id}</span></p>
            <p class="text-sm font-medium text-gray-700">First Name: <span class="font-semibold">${user.firstname}</span></p>
            <p class="text-sm font-medium text-gray-700">Last Name: <span class="font-semibold">${user.lastname}</span></p>
            <p class="text-sm font-medium text-gray-700">Email: <span class="font-semibold">${user.email}</span></p>
            <p class="text-sm font-medium text-gray-700">Credit: <span class="font-semibold">$${user.credit.toFixed(2)}</span></p>
            <p class="text-sm font-medium text-gray-700">Admin: <span class="font-semibold">${user.is_admin ? 'Yes' : 'No'}</span></p>
          </div>
          <button onclick="deleteUser(${user.id})" class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
        `;
				userList.appendChild(listItem);
			});
		}

		function deleteUser(id) {
			const index = users.findIndex((user) => user.id === id);
			if (index !== -1) {
				users.splice(index, 1);
				loadUsers();
			}
		}

		document.getElementById('openAddUserPopup').addEventListener('click', function () {
			document.getElementById('addUserPopup').classList.toggle('hidden');
		});

		document.getElementById('openAddUserPopup').addEventListener('click', function () {
			document.getElementById('addUserPopup').classList.remove('hidden');
		});

		document.getElementById('closeAddUserPopup').addEventListener('click', function () {
			document.getElementById('addUserPopup').classList.add('hidden');
		});

		// Function to show the add scooter popup
		document.getElementById('openAddScooterPopup').addEventListener('click', function () {
			document.getElementById('addScooterPopup').classList.remove('hidden');
		});

		// Function to close the add scooter popup
		function closeAddScooterPopup() {
			document.getElementById('addScooterPopup').classList.add('hidden');
		}

		// Function to add scooter (placeholder for actual logic)
		function addScooter() {
			// Implement your logic to handle form submission here
			// Example: You can access form fields using document.getElementById('fieldId').value
			// For now, let's just close the popup
			closeAddScooterPopup();
		}

		window.onload = function () {
			loadUsers();
			loadTransactions();
			loadScooters();
		};
	</script>
</html>
