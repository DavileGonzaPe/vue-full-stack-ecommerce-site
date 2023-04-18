<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" :alt="product.imageUrl">
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button @click="addToCart" class="add-to-cart">Add to cart</button>
        </div>
    </div>
    <div v-else>
        <NotFoundPage />
    </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import NotFoundPage from './NotFoundPage.vue';
import { ref, onBeforeMount } from 'vue';

export default {
    name: "ProductDetailPage",
    components: { NotFoundPage },
    setup() {
        const route = useRoute();
        let product = ref([]);

        onBeforeMount(async () => {
            const response = await axios.get(`/api/products/${route.params.productId}`);
            product.value = response.data;
        });

        const addToCart = async () => {
            try {
                await axios.post('/api/users/12345/cart', { id: route.params.productId });
                alert('Succesfully added item to cart!');
            } catch (error) {
                console.log(error);
            }
        };

        return {
            product,
            addToCart,
        };
    },

}
</script>