<script lang="ts">
	import { enhance } from "$app/forms";
</script>

<h1>Sign up</h1>
<form method="POST" use:enhance>
	<label for="firstname">Firstname</label>
	<input type="firstname" name="firstname" id="firsname" /><br />
	<label for="lastname">Lastname</label>
	<input type="lastname" name="lastname" id="lastname" /><br />
	<label for="email">Email</label>
	<input type="email" name="email" id="email" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" /><br />
    <button>Continue</button>
</form>