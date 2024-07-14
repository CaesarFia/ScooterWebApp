<script lang="ts">
  import { onMount } from 'svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import ProfileCircle from '../components/ProfileCircle.svelte';
  import LoginPopUp from '../components/LoginPopUp.svelte';
  import Map from '../components/MapComponent.svelte';
	import Layout from './+layout.svelte';


  let isLogedIn = false;

  function close(){
    isLogedIn = true;
  }


</script>

<main>
  <Map />
  {#if !isLogedIn}
  <LoginPopUp on:close={close}/>
  {:else}
  <Sidebar />
  <ProfileCircle />
  {/if}
</main>
