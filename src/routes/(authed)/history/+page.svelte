<script lang="ts">
	export let data;
</script>

<div
	id="header"
	class="relative flex h-16 w-screen flex-row items-center justify-center rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
>
	<div class="items-center justify-center text-2xl font-bold">History</div>
</div>
<div
	id="body"
	class="relative flex h-full w-full flex-col items-center justify-start space-y-10 overflow-scroll scroll-auto bg-inherit"
>
	{#if data.rentals.length > 0}
		{#each data.rentals as rentalJoin}
			{@const rental = rentalJoin.rentals}
			<div
				id="scooterBlock"
				class="relative mt-6 flex w-3/4 items-center rounded-lg bg-gray-900 text-gray-200 border-2 border-gray-600"
			>
				<div id="information" class="m-1 h-full space-y-6 w-full">
					<div class="font-extrabold">Scooter: {rental.scooterId}</div>
					<div>Mileage: {rental.mileage.toFixed(2)}</div>
					<div class="flex items-center space-x-4">
						<div class="">{rental.startTime.toLocaleDateString()}</div>
						<div class="">
							{rental.startTime.toLocaleTimeString()} - {rental.endTime
								? rental.endTime.toLocaleTimeString()
								: 'Ongoing'}
						</div>
					</div>
				</div>
				<div
					class="relative flex h-full w-1/4 items-center justify-center rounded-r-lg text-2xl font-extrabold"
				>
					{#if rental.endTime}
						<div class="text-green-500">${rentalJoin.amount}</div>
					{:else}
						<form action="?/end_rental" method="POST">
							<input type="hidden" name="rentalId" value={rental.id} />
							<button type="submit" class="p-2 m-2 bg-green-500 rounded-lg text-gray-200">
								End Rental
							</button>
						</form>
					{/if}
				</div>
			</div>
		{/each}
	{:else}
		<div class="text-2xl font-extrabold">No Previous Transactions</div>
	{/if}
</div>
