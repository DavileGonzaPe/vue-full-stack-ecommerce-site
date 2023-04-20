<template>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
        <ShoppingCartList @remove-from-cart="removeFromCart" :products="cartItems" />
        <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-else>
        You current have no items in your cart!
    </div>
</template>

<script>
import { ref, onBeforeMount, watch } from 'vue';
import ShoppingCartList from '@/components/ShoppingCartList.vue';
import axios from 'axios';

export default {
    name: "ShoppingCartPage",
    components: { ShoppingCartList },
    props: ['user'],

    setup(props) {
        const loggedUser = ref(props.user);
        let cartItems = ref([]);

        watch(loggedUser, async (newUserValue) => {
            if (newUserValue) {
                const cartResponse = await axios.get(`/api/users/${newUserValue.uid}/cart`);
                cartItems.value = cartResponse.data;
            }
        });

        onBeforeMount(async () => {
            if (loggedUser.value) {
                const response = await axios.get(`/api/users/${loggedUser.value.uid}/cart`);
                cartItems.value = response.data;
            }

        });

        async function removeFromCart(productId) {
            const response = await axios.delete(`/api/users/${loggedUser.value.uid}/cart/${productId}`);
            const updatedCart = response.data;
            cartItems.value = updatedCart;
        }

        return {
            cartItems,
            removeFromCart,
        };
    },

}
</script>
