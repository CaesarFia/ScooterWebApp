<script lang='ts'>
	export let data;

	let editing: 'Off' | 'On' = 'Off';
	function goBack() {
    history.back();
  }

  function handleEdit(event: Event) {
	editing = 'On';
  }

  function handleSave(event: Event) {
	editing = 'Off';
	// other stuff like updating the values in the db
  }

  
</script>
<div id="page" class="h-screen bg-background">
	<div
		id="header"
		class="relative flex h-16 w-screen flex-row items-center justify-between rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
	>
		<button on:click={goBack} class="relative ml-1 flex rounded-full bg-background p-1">
			<img src="src/lib/images/arrowBack.png" alt="back arrow img" />
		</button>
		<div class="text-2xl font-bold">Profile</div>
		<div id="Profile Link" class="mr-0">
			<a href="/profile" class="relative flex">
				<div class="rounded-l-lg border border-gray-600 bg-background text-gray-900">
					<img src="src/lib/images/profileHead.png" alt="generic profile img" />
				</div>
				<div class="mr-1 rounded-r-lg border border-gray-600 bg-background p-1 text-gray-900">
					username
				</div>
			</a>
		</div>
	</div>

	<div
		id="body"
		class="relative flex h-full w-full flex-row items-center justify-start space-y-10 overflow-scroll scroll-auto bg-inherit"
	>
		<div class="h-full w-1/3">
			<div
				id="profile circle"
				class="relative flex w-48 h-48 rounded-full border-4 border-gray-900 mt-11 ml-3 bg-white justify-center items-center"
			>
				<img src="" alt="generic profile pic" />
			</div>
		</div>
		{#if editing == 'Off'}
		<div class="bg-inherit h-screen w-2/3">
			<div class="font-extrabold text-2xl">
				<div class="text-slate-50 text-5xl">Hello,</div>
				<div class="">{data.user.firstname} {data.user.lastname}</div>
				<div class="mt-5">Email:</div>
				<div class="">{data.user.email}</div>
				<div class="mt-5">Date Created:</div>
				<div class="">date</div>
			</div>
			<button on:click={handleEdit}
				class="absolute bottom-0 mb-20 ml-24 rounded-2xl border bg-white pb-5 pl-9 pr-9 pt-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
				>Edit</button
			>
		</div>
		{/if}

		{#if editing == 'On'}
		<div class="bg-inherit h-screen w-2/3">
			<div class="font-extrabold text-2xl">
				<div class="text-slate-50 text-5xl">Hello,</div>
				<div class="">!</div>
				<div class="mt-5">Email:</div>
				<div class="">email</div>
				<div class="mt-5">Date Created:</div>
				<div class="">date</div>
			</div>
			<button on:click={handleSave}
				class="absolute bottom-0 mb-20 ml-56 rounded-2xl border bg-white pb-5 pl-9 pr-9 pt-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
				>Save</button
			>
		</div>
		{/if}

	</div>
</div>
