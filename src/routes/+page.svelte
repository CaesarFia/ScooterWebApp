<script>
  import "../app.css";
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

</section>
	<style lang="postcss">
	  :global(html) {
	    background-color: theme(colors.pink.100);
	  }
	</style>


