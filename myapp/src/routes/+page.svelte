<!-- <h1>Welcome to Website</h1> -->

<script>
    /** @type {{ data: import('./$types').PageData }} */
    let { data } = $props();
    import Productcard from '../components/Productcard.svelte';
    // import Searchbar from '../components/Searchbar.svelte';
    import 'flowbite/dist/flowbite.min.css';
    // import { Geolocation } from '@capacitor/geolocation';

    // /**
    //  * @type {import("@capacitor/geolocation").Position | null}
    //  */
    // let loc = null;
    // async function getCurrentPosition(){
    //     const res = await Geolocation.getCurrentPosition()
    //     loc = res
    // }
    // console.log(data)
</script>

<svelte:head>
    <title>E-COMMERCE</title>
</svelte:head>

<!-- <div>
    <h1>Geolocation</h1>
    <p>Your location is:</p>
    <p>Latitude: {loc?.coords.latitude}</p>
    <p>Longitude: {loc?.coords.longitude}</p>

    <button onclick={getCurrentPosition}>
        Get Current Location
    </button>
</div> -->
<!-- <div class="searchdiv">
    <Searchbar/>
</div> -->
<div class="product-card">
    {#each data.data.products as product}
        <Productcard {product}/>
    {/each}
</div>


<style>
    .product-card{
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
        column-gap: 1rem;
        row-gap: 1rem;
        padding:1rem;
    }

    /* .searchdiv{
        padding:1rem;
    } */
</style>