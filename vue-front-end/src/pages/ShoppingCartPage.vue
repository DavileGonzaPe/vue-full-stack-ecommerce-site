<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingCartList :products="cartItems"/>
        <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-else>
        You current have no items in your cart!
    </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import ShoppingCartList from '@/components/ShoppingCartList.vue';
import axios from 'axios';

export default {
    name: "ShoppingCartPage",
    components: { ShoppingCartList },
    setup() {
        const cartItems = ref([]);

        onBeforeMount(async () => {
            const response = await axios.get('/api/users/12345/cart');
            cartItems.value = response.data;
        });

        return {
            cartItems,
        };
    },
    
}
</script>
