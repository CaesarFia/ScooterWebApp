<script lang='ts'>
	import { writable } from 'svelte/store';
	export let data;

	const amount = writable<string>('');

	let isEmployee = data.user?.isAdmin;

	function scrollToSection(sectionId: string) {
		
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function formatCurrency(value: string): string {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (isNaN(numericValue)) {
      return '';
    }
    return numericValue.toFixed(2);
  }

  function handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^0-9.]/g, '');

    if (value.split('.').length > 2) {
      value = value.slice(0, value.lastIndexOf('.'));
    }

    amount.set(formatCurrency(value));
  }

  function handlePayment(event: Event) {
    //needs to be done
  }
  
  function goBack() {
    history.back();
  }

</script>
<div class="h-screen bg-background">
	<div id="header" class="relative flex h-16 w-screen flex-row items-center justify-between rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">
	  <button on:click={goBack} class="relative ml-1 flex rounded-full bg-background p-1">
		<img src="src/lib/images/arrowBack.png" alt="back arrow img" />
	  </button>
	  <div class="text-2xl font-bold">Balance</div>
	  <div id="Profile Link" class="mr-0">
		<a href="/profile" class="relative flex">
		  <div class="rounded-l-lg border border-gray-600 bg-background text-gray-900">
			<img src="src/lib/images/profileHead.png" alt="generic profile img" />
		  </div>
		  <div class="mr-1 rounded-r-lg border border-gray-600 bg-background p-1 text-gray-900">username</div>
		</a>
	  </div>
	</div>
	<div id="currentBalance" class="relative flex h-screen flex-col items-center bg-inherit">
	  <div class="mt-64 text-8xl">{data.data.currentBalance}</div>
	  <button on:click={() => scrollToSection('paymentFooter')} class="absolute bottom-0 mb-20 rounded-2xl border bg-white pb-5 pl-9 pr-9 pt-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">Top Up?</button>
	</div>
	<div class="h-7 bg-gradient-to-t from-white to-background"></div>
	<div id="paymentFooter" class="relative flex h-1/2 flex-col items-center justify-center space-y-1 bg-white p-5">
	  <div class="relative flex">
		<div class="rounded-l-lg border bg-white px-5 py-3 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">$</div>
		<input on:input={handleInput} placeholder="Amount:" class="rounded-r-lg border bg-white py-3 pl-4 pr-11 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
	  </div>
	  <input placeholder="Card Holder's Name:" class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
	  <input placeholder="Card Number:" class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
	 