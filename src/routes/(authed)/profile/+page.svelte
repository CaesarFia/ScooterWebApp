<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	let firstname = data.user.firstname;
	let lastname = data.user.lastname;
	let email = data.user.email;
</script>

<div id="page" class="h-screen bg-background">
	<div
		id="header"
		class="relative flex h-16 w-screen flex-row items-center justify-between rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
	>
		<button class="relative ml-1 flex rounded-full bg-background p-1" on:click={() => goto("/")}>
			<img src="src/lib/images/arrowBack.png" alt="back arrow img" />
		</button>
		<div class="text-2xl font-bold">Profile</div>
		<div id="Profile Link" class="mr-0">
			<a href="/profile" class="relative flex">
				<div class="rounded-l-lg border border-gray-600 bg-background text-gray-900">
					<img src="src/lib/images/profileHead.png" alt="generic profile img" />
				</div>
				<div class="mr-1 rounded-r-lg border border-gray-600 bg-background p-1 text-gray-900">
					{data.user.firstname} {data.user.lastname}
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
		<div class="bg-inherit h-screen w-2/3">
			<form class="space-y-3 font-extrabold text-2xl" action="?/update_user" method="POST">
				<h2 class="text-slate-50 text-5xl">Hello!</h2>
				<label class="" for="firstname">First Name:</label>
				<input
					class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
					type="text"
					value={firstname}
					name="firstname"
					id="firstname"
					required
				/>
				<label class="" for="lastname">Last Name</label>
				<input
					class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
					type="text"
					value={lastname}
					name="lastname"
					id="lastname"
					required
				/><br />
				<label class="" for="email">Email</label>
				<input
					class="w-full px-3 py-2 bg-tc text-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-tc focus:border-blue-500 sm:text-sm"
					type="text"
					value={email}
					name="email"
					id="email"
					required
				/><br />
				
				<button
				class="mb-20 ml-56 rounded-2xl border bg-white pb-5 pl-9 pr-9 pt-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
				>Update!</button
			>
			</form>
		</div>
	</div>
</div>
