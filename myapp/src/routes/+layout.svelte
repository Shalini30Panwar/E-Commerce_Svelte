<script>
    import { Navbar, NavBrand, NavHamburger, Button, Indicator } from 'flowbite-svelte';
    import { writable } from 'svelte/store';
    import Cart from '../components/Cart.svelte';
    import { cart } from './store/cartstore';
    import { page } from '$app/stores';
    let totalItems = 0;
    $: {
    totalItems = $cart.reduce((total, item) => total + item.quantity, 0);
    }
    let showCart = writable(false);
    function toggleCart() {
      showCart.update(currentState => !currentState);
    }
    $: $page.url, showCart.set(false);
    // export const prerender = true;
</script>

<Navbar>
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">E-Commerce</span>
    </NavBrand>
    <div class="flex md:order-2">
      <Button size="lg" class="relative text-white bg-red-500 hover:bg-red-700" on:click={toggleCart}>MyCart 
        <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
        </svg>        
        <Indicator color="blue" border size="xl" placement="top-right" class="text-xs font-bold">{totalItems}</Indicator>
      </Button>
      <NavHamburger />
    </div>
  </Navbar>
{#if $showCart}
  <Cart/>
{/if}

<slot/>

