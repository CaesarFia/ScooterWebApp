<div id="page" class="h-screen bg-background">
    <div id="header" class="relative flex h-16 w-screen flex-row items-center justify-between rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <button class="relative ml-1 flex rounded-full bg-background p-1">
        <img src="src/lib/images/arrowBack.png" alt="back arrow img" />
      </button>
      <div class="text-2xl font-bold">History</div>
      <div id="Profile Link" class="mr-0">
        <a href="/profile" class="relative flex">
          <div class="rounded-l-lg border border-gray-600 bg-background text-gray-900">
            <img src="src/lib/images/profileHead.png" alt="generic profile img" />
          </div>
          <div class="mr-1 rounded-r-lg border border-gray-600 bg-background p-1 text-gray-900">{username}</div>
        </a>
      </div>
    </div>
    <div id="body" class="relative flex h-full w-full flex-col items-center justify-start space-y-10 overflow-scroll scroll-auto bg-inherit">
      <div id="scooterBlock" class="relative mt-6 flex h-1/6 w-3/4 items-center rounded-lg bg-gray-900 text-gray-200">
        <div id="scooter img" class="relative flex h-full w-1/4 items-center justify-center rounded-l-lg border-2 border-gray-600">
          <img src="src/lib/images/genScooterImg.jpg" alt="generic scooter img" />
        </div>
        <div id="information" class="m-1 h-full w-1/2 space-y-6 border-gray-600">
          <div class="font-extrabold">{scooter id}</div>
          <div>{Location}</div>
          <div class="flex items-center space-x-4">
            <div class="">{time}</div>
            <div>{date}</div>
          </div>
        </div>
        <div id="amount" class="relative flex h-full w-1/4 items-center justify-center rounded-r-lg border-2 border-gray-600 text-2xl font-extrabold">-{amt}</div>
      </div>
      <div class="text-2xl font-extrabold">No Previous Transactions</div>
    </div>
  </div>
  