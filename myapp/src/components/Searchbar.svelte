<!-- <script>
    import { Search, Button } from 'flowbite-svelte';
    // import { SearchOutline } from 'flowbite-svelte-icons';
    // let {data}=$props();
    // console.log(data)
    let searchtext=""
    function handlechange(){
      console.log("hello")
      console.log(searchtext)
    }


  </script>
  
  
  <div>
    <input 
      type="text" 
      placeholder="Search for items..." 
      bind:value={searchtext} 
      class="search-input" 
    />
  </div> -->


  <script>
    let searchQuery = ""; 
    import { cart } from "../routes/store/cartstore";
    let cartItems = [
      { id: 1, name: 'Apple', price: 1.5 },
      { id: 2, name: 'Banana', price: 0.5 },
      { id: 3, name: 'Orange', price: 1.0 },
      { id: 4, name: 'Grapes', price: 2.0 },
      { id: 5, name: 'Watermelon', price: 3.0 }
    ];
  
    $: filteredItems = cartItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  </script>

<ul>
  {#each $cart as item (item.id)}
      <li>{item.title} - {item.quantity} x ${item.price}</li>
  {/each}
</ul>
  
  <div>
    <input 
      type="text" 
      placeholder="Search for items..." 
      bind:value={searchQuery} 
      class="search-input" 
    />
  </div>
  
  <div>
    {#if filteredItems.length > 0}
      <ul>
        {#each filteredItems as item}
          <li>{item.name} - ${item.price}</li>
        {/each}
      </ul>
    {:else}
      <p>No items found.</p>
    {/if}
  </div>
  
  <style>
    .search-input {
      padding: 0.5em;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 200px;
    }
  </style>
  
