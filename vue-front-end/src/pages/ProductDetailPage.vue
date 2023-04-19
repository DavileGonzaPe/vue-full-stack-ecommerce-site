<template>
    <div v-if="product">
        <div class="img-wrap">
            <img :src="product.imageUrl" :alt="product.imageUrl">
        </div>
        <div class="product-details">
            <h1>{{ product.name }}</h1>
            <h3 class="price">{{ product.price }}</h3>
            <button v-if="!itemIsInCart" @click="addToCart" class="add-to-cart">Add to cart</button>
            <button v-else-if="itemIsInCart" class="grey-button" >Item is already in cart</button>
            <button class="sign-in" @click="signIn">Sign in to add to cart</button>
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
import { ref, onBeforeMount, computed } from 'vue';
import { getAuth, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'

export default {
    name: "ProductDetailPage",
    components: { NotFoundPage },
    setup() {
        const route = useRoute();
        let product = ref([]);
        let cartItems = ref([]);

        onBeforeMount(async () => {
            const auth = getAuth();
            if (isSignInWithEmailLink(auth, window.location.href)) {
                const email = window.localStorage.getItem('emailForSignIn');
                await signInWithEmailLink(auth, email, window.location.href);
                alert('Successfully signed in!');
                window.localStorage.removeItem('emailForSignIn');
            }

            const response = await axios.get(`/api/products/${route.params.productId}`);
            product.value = response.data;

            const cartResponse = await axios.get('/api/users/12345/cart');
            cartItems.value = cartResponse.data;
        });

        const addToCart = async () => {
            try {
                await axios.post('/api/users/12345/cart', { id: route.params.productId });
                alert('Succesfully added item to cart!');
            } catch (error) {
                console.log(error);
            }
        };

        async function signIn() {
            const email = prompt('Please enter your email to sign in: ');
            const auth = getAuth();
            const actionCodeSettings = { 
                url: `http://localhost:8080/products/${route.params.productId}`,
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            alert('A login email was sent to the email you provided');
            window.localStorage.setItem('emailForSignIn', email);
        }

        return {
            product,
            itemIsInCart: computed(() => cartItems.value.some((item => item.id === route.params.productId))),
            addToCart,
            signIn,
        };
    },

}
</script>