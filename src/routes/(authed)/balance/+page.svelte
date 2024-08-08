<script lang="ts">
	export let data;
</script>

<div
	id="header"
	class="relative flex h-16 w-screen flex-row items-center justify-center rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
>
	<div class="items-center justify-center text-2xl font-bold">Balance</div>
</div>
<div id="currentBalance" class="relative flex h-screen flex-col items-center bg-inherit">
	<div class="mt-64 text-8xl">
		{data.user.balance ? '$' + data.user.balance : "Employees don't have money!"}
	</div>
	<button
		class="absolute bottom-0 mb-20 rounded-2xl border bg-white pb-5 pl-9 pr-9 pt-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
		>Top Up?</button
	>
</div>
<div class="h-7 bg-gradient-to-t from-white to-background"></div>
<form
	id="paymentFooter"
	class="relative flex h-1/2 flex-col items-center justify-center space-y-1 bg-white p-5"
	action="?/add_balance"
	method="POST"
>
	<div class="relative flex">
		<div
			class="rounded-l-lg border bg-white px-5 py-3 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
		>
			$
		</div>
		<input
			placeholder="Amount:"
			type="number"
			name="amount"
			id="amount"
			min="0"
			step=".01"
			required
			class="rounded-r-lg border bg-white py-3 pl-4 pr-11 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
		/>
	</div>
	<input
		placeholder="Card Holder's Name:"
		class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
	/>
	<input
		placeholder="Card Number:"
		class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
	/>
	<div class="relative flex">
		<input
			placeholder="expirey date: MM/YY"
			class="rounded-l-lg border bg-white py-3 pl-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
		/>
		<input
			placeholder="Security Code:"
			class="rounded-r-lg border bg-white py-3 pl-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
		/>
	</div>
	<input
		placeholder="Zip/Postal Code:"
		class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
	/>
	<button
		class=" w-1/2 rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
		>Pay amount</button
	>
</form>
