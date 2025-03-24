<script>
  /** @type {{ data: import('./$types').PageData }} */
  import { Heading, Rating, Button} from 'flowbite-svelte';
  let {data} = $props();
  import {addToCart} from '../../store/cartstore'
  // export let data
  console.log(data)
</script>

<svelte:head>
  <title>Product Description</title>
</svelte:head>

<div class="maindiv">
  <article>
    <img src={data.productdetail.thumbnail} alt={data.productdetail.title} />
    <Heading tag="h2" customSize="text-3xl">{data.productdetail.title}</Heading>
    <p>{data.productdetail.description}</p>
    <p><strong>Price:</strong> {data.productdetail.price}</p>
    <strong>Discount Percentage: <i style="color: red;">{data.productdetail.discountPercentage}</i></strong>
    {#if data.productdetail.brand}
    <p>Brand: {data.productdetail.brand}</p>
    {/if}
    <p>{data.productdetail.warrantInformation}</p>
    <p>Order {data.productdetail.shippingInformation}</p>
    <p class="text-red-600">Only {data.productdetail.stock} left!!</p>
    <Heading tag="h4" customSize="text-3xl" class="text-red-600">{data.productdetail.returnPolicy}</Heading>
    <Rating rating={data.productdetail.rating} size={24} class="mt-2.5 mb-5"></Rating>
    <Button color="green"  on:click={()=>addToCart(data.productdetail)}>Add to Cart<svg class="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
      <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
    </svg>
    </Button>
  </article>
</div>

<style>
  .maindiv{
    padding:5rem;
    justify-items: center;
  }
</style>




  
  




  
  