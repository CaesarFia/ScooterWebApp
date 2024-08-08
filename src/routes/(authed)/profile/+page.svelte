<script lang="ts">
	export let data;

	let firstname = data.user.firstname;
	let lastname = data.user.lastname;
	let email = data.user.email;
</script>

<div
	id="header"
	class="relative flex h-16 w-screen flex-row items-center justify-center rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
>
	<div class="items-center justify-center text-2xl font-bold">Profile</div>
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
