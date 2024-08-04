<div class="h-screen bg-background">
  <div id="header" class="relative flex h-16 w-screen flex-row items-center justify-between rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">
    <button class="relative ml-1 flex rounded-full bg-background p-1">
      <img src="" alt="back arrow img" />
    </button>
    <div class="text-2xl font-bold">Balance</div>
    <div id="Profile Link" class="mr-0">
      <a href="/profile" class="relative flex">
        <div class="rounded-l-lg border border-gray-600 bg-background text-gray-900">
          <img src="" alt="generic profile img" />
        </div>
        <div class="mr-1 rounded-r-lg border border-gray-600 bg-background p-1 text-gray-900">{username}</div>
      </a>
    </div>
  </div>
  <div id="currentBalance" class="relative flex h-screen flex-col items-center bg-inherit">
    <div class="mt-64 text-8xl">${00}.{00}</div>
    <button class="absolute bottom-0 mb-20 rounded-2xl border bg-white pb-5 pl-9 pr-9 pt-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300">Top Up?</button>
  </div>
  <div class="h-7 bg-gradient-to-t from-white to-background"></div>
  <div id="paymentFooter" class="relative flex h-1/2 flex-col items-center justify-center space-y-1 bg-white p-5">
    <div class="relative flex">
      <div class="rounded-l-lg border bg-white px-5 py-3 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">$</div>
      <input placeholder="Amount:" class="rounded-r-lg border bg-white py-3 pl-4 pr-11 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
    </div>
    <input placeholder="Card Holder's Name:" class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
    <input placeholder="Card Number:" class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
    <div class="relative flex">
      <input placeholder="expirey date: MM/YY" class="rounded-l-lg border bg-white py-3 pl-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
      <input placeholder="Security Code:" class="rounded-r-lg border bg-white py-3 pl-5 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
    </div>
    <input placeholder="Zip/Postal Code:" class="rounded-lg border bg-white py-3 pl-4 pr-24 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300" />
    <button class=" w-1/2 rounded-lg border bg-white px-11 py-3 text-gray-700 focus:border-emerald-300 focus:outline-none focus:ring focus:ring-emerald-200 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">Pay {amount}</button>
  </div>
</div>
