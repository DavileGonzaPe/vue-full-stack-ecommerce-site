import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/cart',
        name: 'cart',
        component: () => import(/* webpackChunkName: "cart" */ '../pages/ShoppingCartPage.vue')
    }, 
    {
        path: '/products',
        component: () => import(/* webpackChunkName: "products" */ '../pages/ProductsPage.vue')
    }, 
    {
        path: '/products/:productId',
        component: () => import(/* webpackChunkName: "product detail" */ '../pages/ProductDetailPage.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router