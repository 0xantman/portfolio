<template>

<b-container  class="mt-5">
    <b-row>
      <b-col>
        <b-nav pills vertical >
          <NuxtLink class="nav-link" to="/admin/my-portfolio" exact>
                  view all 
            </NuxtLink>
          <NuxtLink class="nav-link" to="/admin/my-portfolio/add-new">
                   Add new...
          </NuxtLink>
            
        </b-nav>
      </b-col>
      <b-col cols="10">
        <nuxt-child/>
      </b-col>
    </b-row>
  </b-container>

  

</template>

<script>


export default {
 
}
</script>

<style>

</style>