<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const { user } = data;
</script>

<div class="bg-gray-900 p-4 text-white flex justify-end items-center space-x-4">
	<p class="text-lg">Hello, {user.firstname}</p>
	<form method="post" action="/logout" use:enhance>
		<button
			type="submit"
			class="bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
		>
			Sign Out
		</button>
	</form>
</div>

<slot />
