<template>
    <h1>Products</h1>
    <ProductsList :products="products"/>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import { products } from '../temp-data'

export default {
    name: "ProductsPage",
    components: { ProductsList },
    setup() {
        return {
            products,
        };
    },
    
}
</script>