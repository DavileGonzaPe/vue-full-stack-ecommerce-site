<template>
    <h1>Products</h1>
    <ProductsList :products="products"/>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

export default {
    name: "ProductsPage",
    components: { ProductsList },
    setup() {
        let products = ref([]);

        onBeforeMount(async() => {
            const response = await axios.get('/api/products');
            products.value = response.data;
        });        

        return {
            products,
        };
    },
    
}
</script>