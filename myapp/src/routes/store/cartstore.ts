import { writable } from 'svelte/store';
export interface CartItem {
    id: string | number;
    price: number;
    thumbnail: string;
    title: string;
    rating: number;
    quantity: number;
}

export const cart = writable<CartItem[]>([]);
export function addToCart(product: CartItem): void {
    cart.update(currentCart => {
        const existingProductIndex = currentCart.findIndex(item => item.id === product.id);
        if (existingProductIndex !== -1) {
            currentCart[existingProductIndex].quantity += 1;
        } else {
            currentCart.push({ ...product, quantity: 1 });
        }
        console.log(currentCart)
        return currentCart;
    });
    alert("Product added to cart successfully.");
}
