import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/products'
    }, 
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
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "not found page" */ '../pages/NotFoundPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router