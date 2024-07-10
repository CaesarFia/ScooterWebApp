<script lang=ts>
	import { enhance } from "$app/forms"
	import { addScooter, getScooters, deleteScooter, updateScooter, addUser, getUser, deleteUser, addTransaction, deleteTransaction, updateTransaction, getTransactions } from "$lib/calls";
  	import "$app.css";

	let recentScooterId : string
	let recentUserId: string
	let recentTransactionId: string

    async function addScooterTest(latitude: number, longitude: number, battery: number) {
        // Assume addScooter returns the new scooter's ID
        const {success, id} = await addScooter(latitude, longitude, battery);
        recentScooterId = id
		return recentScooterId
    }
	async function deleteScooterTest () {
        // Assume addScooter returns the new scooter's ID
        const {success} = await deleteScooter(recentScooterId)
		return success
    }
	async function updateScooterTest () {
		const {success} = await updateScooter(recentScooterId, 1, 1, 1, false, true)
		return success
	}

	async function addUserTest() {
        // Assume addScooter returns the new scooter's ID
        const {success, id} = await addUser("Bob", "Jones", "a@fake.email", "dvksavkas", null);
        recentUserId = id
		return recentUserId
    }
	async function deleteUserTest () {
        // Assume addScooter returns the new scooter's ID
        const {success} = await deleteUser(recentUserId)
		return success
    }

	async function addTransactionTest() {
        // Assume addScooter returns the new scooter's ID
        const {success, id} = await addTransaction(recentUserId, recentScooterId);
        recentTransactionId = id
		return recentTransactionId
    }
	async function deleteTransactionTest () {
        // Assume addScooter returns the new scooter's ID
        const {success} = await deleteTransaction(recentTransactionId)
		return success
    }
	async function updateTransactionTest (amount: number) {
		const {success} = await updateTransaction(amount, recentTransactionId)
		return success
	}

</script>

<!-- TEMPLATES FOR API CALLS
const response = await fetch(url, { method: "<method>" })
 // URLS + METHODs
	POST user: http://localhost:5173/api/users?firstname=Bob&lastname=Jones&email=nana&password=thegodlybob
	GET user: http://localhost:5173/api/users?email=nana&password=thegodlybob

	POST scooter: http://localhost:5173/api/scooters?latitude=69&longitude=42&checkedOut=true&needRepairs=false&battery=99
	GET scooter: http://localhost:5173/api/scooters

	POST transaction: http://localhost:5173/api/transactions?customer=1&scooter=1&employee=1
	GET transaction: http://localhost:5173/api/transactions?customer=1

if (!response.ok) {
      throw new Error("Network response was not ok")
    }

const result = await response.json
-->

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-3xl font-bold underline">
		Hello world!
	</h1>

	<h2>
		try editing <strong>src/routes/+page.svelte</strong>
	</h2>

	<h3><b><u>Scooters</u></b></h3>

	<button on:click={async () => console.log(await addScooterTest(1,1,1))}> Add scooter </button>
	<button on:click={async () => console.log(await getScooters())}> Get scooters </button>
	<button on:click={async () => console.log(await deleteScooterTest())}> Delete scooter </button>
	<button on:click={async () => console.log(await updateScooterTest())}> Update scooter </button>

	<h3><b><u>Users</u></b></h3>

	<button on:click={async () => console.log(await addUserTest())}> Add User </button>
	<button on:click={async () => console.log(await getUser())}> Get User </button>
	<button on:click={async () => console.log(await deleteUserTest())}> Delete User </button>

	<h3><b><u>Transactions</u></b></h3>

	<button on:click={async () => console.log(await addTransactionTest())}> Add Transaction </button>
	<button on:click={async () => console.log(await getTransactions())}> Get Transactions </button>
	<button on:click={async () => console.log(await deleteTransactionTest())}> Delete Transaction </button>
	<button on:click={async () => console.log(await updateTransactionTest(1))}> Update Transaction </button>
	
	<form method="post" use:enhance>
		<button>Sign out</button>
	</form>

</section>
	<style lang="postcss">
	  :global(html) {
	    background-color: theme(colors.pink.100);
	  }
	</style>


