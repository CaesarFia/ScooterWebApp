<script lang="ts">
	import { enhance } from '$app/forms';
	
	export let data;
</script>

<main>
	<h1>Hello {data.firstname}!</h1>
	<form method="post" action="/logout" use:enhance>
		<button>Sign out</button>
	</form>
    <slot />
</main>