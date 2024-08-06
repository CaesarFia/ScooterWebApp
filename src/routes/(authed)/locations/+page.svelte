<div id="page" class="h-screen bg-background">
    <div id="header" class="relative flex h-16 w-screen flex-row items-center justify-between rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <button class="relative ml-1 flex rounded-full bg-background p-1">
        <img src="src/lib/images/arrowBack.png" alt="back arrow img" />
      </button>
      <div class="text-2xl font-bold">Locations</div>
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
      <form class="mx- max-w-sm ">
        <label for="filters" class="text-sm font-medium text-gray-900 dark:text-gray-900 ">Filter by:</label>
        <select id="filters" class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-900">
          <option selected>Choose a Filter</option>
          <option value="DT">Distance</option>
          <option value="CT">Cost</option>
          <option value="MK">Make</option>
          <option value="DP">Date Purchased</option>
          <option value="MD">Miles Driven</option>
          <option value="AV">Availabilty</option>
        </select>
      </form>
  
      <div id="scooterBlock" class="relative flex w-3/4 rounded-lg bg-gray-900 text-gray-200">
        <div id="scooter-img" class="relative flex w-1/5 items-center justify-center rounded-l-lg border-2 border-gray-600">
          <img src="src/lib/images/genScooterImg.jpg" alt="generic scooter img" />
        </div>
        <div id="information" class="w-3/5 p-2">
          <div class="font-extrabold">{scooter id}</div>
          <div>{Est. cost}</div>
          <div class="flex items-center space-x-3">
            <div class="">{Charge}</div>
            <div>{make}</div>
            <div>{date purchased}</div>
            <div>{# miles driven}</div>
          </div>
        </div>
        <div id="amount" class="relative flex w-1/5 items-center justify-center rounded-r-lg border-2 border-gray-600 text-2xl font-extrabold">{availabilty}</div>
      </div>
    </div>
  </div>
  