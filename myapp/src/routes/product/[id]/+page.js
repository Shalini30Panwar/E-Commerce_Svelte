/** @type {import('./$types').PageLoad} */
export async function load({ fetch,params }) {
    const id=params.id
    console.log(`https://dummyjson.com/products/${id}`)
    const res=await fetch(`https://dummyjson.com/products/${id}`)
    const productdetail=await res.json()
    console.log(productdetail)
  return {productdetail};
}