<script lang="ts">
	import { enhance } from '$app/forms';
	import type { LayoutData } from './$types';
	
	export let data: LayoutData;
	const { user } = data;
</script>

<main>
	<h1>Hello {user.firstname}!</h1>
	<form method="post" action="/logout" use:enhance>
		<button>Sign out</button>
	</form>
    <slot />
</main>