<template>
    <div class="img-wrap">
        <img :src="product.imageName" :alt="product.imageName">
    </div>
    <div class="product-details">
        <h1>{{ product.name }}</h1>
        <h3 class="price">{{ product.price }}</h3>
        <button class="add-to-cart">Add to cart</button>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { products } from '../temp-data'

export default {
    name: 'ProductDetailPage',
    setup() {
        const route = useRoute()

        return {
            product: products.find(product => product.id === route.params.productId),
        }
    },
}
</script>