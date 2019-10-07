<template>
  <div class="container">
    <profile class="mt-5"/>
    <folio class="mt-5"/>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Profile from '~/components/Profile.vue'
import Folio from '~/components/Folio.vue'

export default {
  data(){
    return{

    }
  },
  components: {
    Logo,
    Profile,
    Folio
  }
}
</script>


