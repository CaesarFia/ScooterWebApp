<script lang='ts'>
  function goBack() {
    history.back();
  }
</script>
<div id="page" class="h-screen bg-background">
    <div id="header" class="relative flex h-16 w-screen flex-row items-center justify-between rounded-b-xl border-2 backdrop-blur-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <button on:click={goBack} class="relative ml-1 flex rounded-full bg-background p-1">
        <img src="src/lib/images/arrowBack.png" alt="back arrow img" />
      </button>
      <div class="text-2xl font-bold">Contact Us</div>
      <div id="Profile Link" class="mr-0">
        <a href="/profile" class="relative flex">
          <div class="rounded-l-lg border border-gray-600 bg-background text-gray-900">
            <img src="src/lib/images/profileHead.png" alt="generic profile img" />
          </div>
          <div class="mr-1 rounded-r-lg border border-gray-600 bg-background p-1 text-gray-900">username</div>
        </a>
      </div>
    </div>
    <div id="body" class="relative flex h-full w-full flex-col items-center justify-start space-y-10 overflow-scroll scroll-auto bg-inherit">
      <div id="profileBlock" class="relative mt-6 flex h-1/5 w-3/4 items-center rounded-lg border-4 border-gray-600 bg-gray-900 text-gray-200">
        <div id="scooter img" class="relative flex h-full w-1/4 items-center justify-center rounded-l-lg border-r-2 border-gray-600">
          <img src="https://github.com/pyukey.png" alt="GitHub Profile Image" class="h-3/4" />
        </div>
        <div id="information" class="space-y- m-1 h-full w-1/2 border-gray-600">
          <div class="p-1 text-2xl font-extrabold">Team Lead</div>
          <div class="p-1">Andrey Nikitin</div>
          <div class="p-1">github username</div>
          <div class="mb-1 pl-1">email</div>
        </div>
      </div>
  
      <div id="profileBlock" class="relative mt-6 flex h-1/5 w-3/4 items-center rounded-lg border-4 border-gray-600 bg-gray-900 text-gray-200">
        <div id="scooter img" class="relative flex h-full w-1/4 items-center justify-center rounded-l-lg border-r-2 border-gray-600">
          <img src="https://github.com/Nikhil-42.png" alt="GitHub Profile Image" class="h-3/4" />
        </div>
        <div id="information" class="space-y- m-1 h-full w-1/2 border-gray-600">
          <div class="p-1 text-2xl font-extrabold">Scrum Master</div>
          <div class="p-1">Nikhil Iyer</div>
          <div class="p-1">github username</div>
          <div class="mb-1 pl-1">email</div>
        </div>
      </div>
  
      <div id="profileBlock" class="relative mt-6 flex h-1/5 w-3/4 items-center rounded-lg border-4 border-gray-600 bg-gray-900 text-gray-200">
        <div id="scooter img" class="relative flex h-full w-1/4 items-center justify-center rounded-l-lg border-r-2 border-gray-600">
          <img src="https://github.com/Jaidenmagnan.png" alt="GitHub Profile Image" class="h-3/4" />
        </div>
        <div id="information" class="space-y- m-1 h-full w-1/2 border-gray-600">
          <div class="p-1 text-2xl font-extrabold">Programmer</div>
          <div class="p-1">Jaiden Magnan</div>
          <div class="p-1">github username</div>
          <div class="mb-1 pl-1">email</div>
        </div>
      </div>
  
      <div id="profileBlock" class="relative mt-6 flex h-1/5 w-3/4 items-center rounded-lg border-4 border-gray-600 bg-gray-900 text-gray-200">
        <div id="scooter img" class="relative flex h-full w-1/4 items-center justify-center rounded-l-lg border-r-2 border-gray-600">
          <img src="https://github.com/caesarfia.png" alt="GitHub Profile Image" class="h-3/4" />
        </div>
        <div id="information" class="space-y- m-1 h-full w-1/2 border-gray-600">
          <div class="p-1 text-2xl font-extrabold">Programmer</div>
          <div class="p-1">Caesar Fiallos</div>
          <div class="p-1">CaesarFia</div>
          <div class="mb-1 pl-