<!-- <script>
    export let product;
    let count=0;
    import { Card, Rating, Button } from "flowbite-svelte";
    import { writable } from "svelte/store";
    let cart=writable([]);
    // function addtocart(title,price){
    //     console.log(`${title}`)
    //     console.log(`${price}`)
    //     console.log(cart)
    //     alert("Product Add to Cart successfully.")
    //     count++
    //     console.log(count)
    // }

    /**
     * @param {{ id: any; }} product
     */
    function addtocart(product) {
        // alert(JSON.stringify(product))
        // $cart=[...$cart,product]
        // alert(JSON.stringify($cart))
    cart.update((currentCart) => {
        console.log(currentCart)
        const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            currentCart[existingProductIndex].quantity += 1;
        } else {
            currentCart.push({...product, quantity: 1});
        }
        return currentCart;
    });
    alert("Product added to cart successfully.");
}
</script> -->

<!-- <script lang="ts">
    import { Card, Rating, Button } from "flowbite-svelte";
    import { writable } from "svelte/store";
    interface Product {
        id: string | number;   
        name: string; 
        price: number;
        thumbnail:string;
        title:string;
        rating:number;
    }

    interface CartItem extends Product {
        quantity: number;     
    }
    export let product: Product;
    let cart = writable<CartItem[]>([]);
    function addtocart(product: Product): void {
        cart.update((currentCart: CartItem[]) => {
            const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                currentCart[existingProductIndex].quantity += 1;
            } else {
                currentCart.push({...product, quantity: 1});
            }
            console.log(currentCart)
            return currentCart; 
        });
        alert("Product added to cart successfully.");
    }
</script> -->

<script lang="ts">
    import { Card, Rating, Button } from "flowbite-svelte";
    import { addToCart } from "../routes/store/cartstore"; 
    interface Product {
        id: string | number;
        price: number;
        thumbnail: string;
        title: string;
        rating: number;
        quantity: number;
    }
    export let product: Product;
    function addtocart(product: Product): void {
        addToCart(product);  
    }
</script>


<!-- <ul>
    {#each $cart as item}
        <li>{item.title} - {item.quantity}</li>
    {/each}
</ul> -->


<!-- <script lang="ts">
    export let product;
    let count=0;
    import { Card, Rating, Button } from "flowbite-svelte";
    function addtocart(title:any,price:any){
        console.log(`${title}`)
        console.log(`${price}`)
        alert("Product Add to Cart successfully.")
        count++
    }
</script> -->

<Card padding="none">
    <!-- data-sveltekit-reload => due to this full page reload occur -->
    <a data-sveltekit-preload-data="tap" href={`/product/${product.id}`}>
        <img class="p-8 rounded-t-lg" src={product.thumbnail} alt={product.title} />
    </a>
    <div class="px-5 pb-5">
        <a data-sveltekit-preload-data="tap" data-sveltekit-reload class="onhover" href={`/product/${product.id}`}>
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
        </a>
        <Rating rating={product.rating} size={24} class="mt-2.5 mb-5"></Rating>
        <div class="flex justify-between items-center">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">Price:- {product.price}</span>
            <Button color="green" on:click={()=>addtocart(product)}>Add to Cart</Button>
        </div>
    </div>
</Card>



<style>
    img{
        width: 100%;
        height: 30vh;
        border-radius: 1rem;
    }
    .onhover:focus{
        text-decoration: underline;
        color: chocolate;
    }
    .onhover h5:hover{
        color: chocolate;
    }
</style>
