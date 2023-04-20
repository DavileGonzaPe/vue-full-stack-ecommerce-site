<template>
  <NavBar :user="user"/>
  <div class="page-wrap">
    <router-view :user="user"></router-view>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NavBar from '@/components/NavBar.vue'
import { ref, onBeforeMount } from 'vue';

export default {
  name: 'App',
  components: { NavBar },

  setup() {
    const user = ref(null);

    onBeforeMount(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, newUserValue => {
        user.value = newUserValue;
      })
    })

    return {
      user
    }
  }


}
</script>
