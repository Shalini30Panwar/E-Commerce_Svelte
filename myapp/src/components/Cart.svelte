<!-- <table class="table-auto w-full">
  <thead>
      <tr>
          <th class="px-4 py-2">Product</th>
          <th class="px-4 py-2">Quantity</th>
          <th class="px-4 py-2">Price</th>
          <th class="px-4 py-2">Total</th>
          <th class="px-4 py-2">Actions</th>
      </tr>
  </thead>
  <tbody>
      {#each $cart as item (item.id)}
          <tr>
              <td class="px-4 py-2">{item.title}</td>
              <td class="px-4 py-2">
                  <button on:click={() => updateQuantity(item, -1)} class="px-2">-</button>
                  {item.quantity}
                  <button on:click={() => updateQuantity(item, 1)} class="px-2">+</button>
              </td>
              <td class="px-4 py-2">{item.price}</td>
              <td class="px-4 py-2">{(item.quantity * item.price).toFixed(2)}</td>
              <td class="px-4 py-2">
                  <button on:click={() => removeItem(item.id)} class="text-red-500">Remove</button>
              </td>
          </tr>
      {/each}
  </tbody>
</table>
<div class="mt-4 text-right">
  <span class="text-xl font-bold">Total Price: ${totalPrice().toFixed(2)}</span>
</div> -->


<script lang="ts">
  import { Heading, Button } from "flowbite-svelte";
  import { cart } from "../routes/store/cartstore";
  import {Table, TableBody, TableHead, TableHeadCell, TableBodyCell, TableBodyRow} from "flowbite-svelte";
  let totalPrice=0
  $: totalPrice = $cart.reduce((total, item) => total + item.price * item.quantity, 0);
  interface Product {
    id: string | number;
    title: string;
    price: number;
    quantity: number;
}

  function removeItem(productid: string | number):void{
    cart.update(currentCart=>{
      const existingProductIndex=currentCart.findIndex(item => item.id === productid);
      if (existingProductIndex !== -1) {
        totalPrice -= currentCart[existingProductIndex].price * currentCart[existingProductIndex].quantity;
        currentCart.splice(existingProductIndex,1);
        }
        return currentCart;
    })
  }

  function updateQuantity(product:Product,count: number):void{
    cart.update(currentCart=>{
      const existingProductIndex=currentCart.findIndex(item=> item.id ===product.id);
      if(count == 1 && product.quantity>=1){
        product.quantity=product.quantity+1
        totalPrice += currentCart[existingProductIndex].price * currentCart[existingProductIndex].quantity;
      }
      else if(count == -1 && product.quantity>1){
        product.quantity=product.quantity-1
        totalPrice += currentCart[existingProductIndex].price * currentCart[existingProductIndex].quantity;
      }
      else{
        product.quantity=1
        totalPrice += currentCart[existingProductIndex].price * currentCart[existingProductIndex].quantity;
        alert("Atleast one quantity is mandatory! If you don't want this product then remove it.")
      }
      return currentCart;
    })
  }


  export function checkout(){
    cart.update(currentCart=>{
      const user_email='shalini.panwar@gmail.com'
      fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_email:user_email,
        items: currentCart,
        totalPrice: totalPrice,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Cart saved:', data);
        alert("Your cart data has been placed to deliver.")
        $cart = [];
        // totalPrice = 0;
      })
      .catch((error) => {
        console.error('Error during checkout:', error);
      });
    return currentCart;
  });
    // console.log("cartdata",$cart)
    // $cart=[]
    // return 
  }
</script>

<!-- <div>
  <h2>Your Cart</h2>
  <ul>
      {#each $cart as item (item.id)}
          <li>{item.title} - {item.quantity} x ${item.price}</li>
      {/each}
  </ul>
</div> -->


<!-- <table class="min-w-full border-collapse table-auto">
    <thead>
      <tr class="bg-gray-100">
        <th class="px-4 py-2 border text-left">Product</th>
        <th class="px-4 py-2 border text-left">Price</th>
        <th class="px-4 py-2 border text-left">Quantity</th>
        <th class="px-4 py-2 border text-left">Total</th>
        <th class="px-4 py-2 border">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each $cart as item (item.id)}
        <tr>
          <td class="px-4 py-2 border">{item.title}</td>
          <td class="px-4 py-2 border">${item.price.toFixed(2)}</td>
          <td class="px-4 py-2 border">{item.quantity}</td>
          <td class="px-4 py-2 border">${(item.price * item.quantity).toFixed(2)}</td>
          <td class="px-4 py-2 border">
            <button 
              class="text-red-500 hover:text-red-700">
              &#9949;
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table> -->

  <div class="container"></div>
{#if $cart.length>0}
  <Table striped={true}>
    <TableHead class="text-sm text-red-600 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
      <TableHeadCell>Product</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Total</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Action</span>
      </TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y" >
      {#each $cart as item (item.id)}
        <TableBodyRow>
          <TableBodyCell>{item.title}</TableBodyCell>
          <TableBodyCell>{item.price.toFixed(2)}</TableBodyCell>
          <TableBodyCell>
            <Button color="red" size="xs" on:click={() => updateQuantity(item, -1)}>-</Button>
                {item.quantity}
            <Button color="red" size="xs" on:click={() => updateQuantity(item, 1)} >+</Button>
          </TableBodyCell>
          <TableBodyCell>{(item.price * item.quantity).toFixed(2)}</TableBodyCell>
          <TableBodyCell>
            <Button class="font-medium text-primary-600 hover:underline dark:text-primary-500" on:click={() => removeItem(item.id)}>❌</Button>
          </TableBodyCell>
        </TableBodyRow>
        {/each}
      </TableBody>
      <div class="mt-4">
        <p class="text-xl font-semibold ps-5">Total: {totalPrice.toFixed(2)}/-</p>
      </div>
      <Button color="green" class="m-5" on:click={checkout}>Check out</Button>
    </Table>
  
{:else}
  <Heading tag="h5" class="ps-5 text-blue-700 text-center bg-gray-100 dark:bg-gray-700 dark:text-gray-400">"Cart is Empty!"</Heading>
{/if}

