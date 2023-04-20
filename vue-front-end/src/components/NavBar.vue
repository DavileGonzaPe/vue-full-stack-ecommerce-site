<template>
    <div class="nav-bar">
        <router-link to="/products" class="products-link">
            <div class="logo-wrap">
                <img :src="logo" alt="hexagon logo">
            </div>
        </router-link>
        <div class="nav-buttons-wrap">
            <button v-if="user" @click="signOutUser">Sign out</button>
            <router-link to="/cart">
                <button>Shopping Cart</button>
            </router-link>
        </div>

    </div>
</template>

<script>
import logo from '@/assets/logo-hexagon.svg';
import { getAuth, signOut } from 'firebase/auth';
import { ref } from 'vue';

export default {
    name: 'NavBar',
    props: ['user'],
    setup(props) {
        const loggedUser = ref(props.user);

        const signOutUser = () => {
            const auth = getAuth();
            signOut(auth);
        }

        return {
            logo,
            loggedUser,
            signOutUser,
        }
    }
}
</script>