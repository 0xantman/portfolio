<template>
   <div>
       <ul class="nav nav-tabs">
        <li class="nav-item">
            <NuxtLink class="nav-link" to="/admin/my-profile">
                Profile
            </NuxtLink>
        </li>
        <li class="nav-item">
            <NuxtLink class="nav-link" to="/admin/my-portfolio">
                Portfolio
            </NuxtLink>
        </li>
        <li class="nav-item">
            <NuxtLink class="nav-link" to="/admin/my-inbox">
                Inbox
            </NuxtLink>
        </li>
        </ul>
        <nuxt-child />
   </div>
</template>

<script>

export default {
    data(){
        return{
            data: null
        }
    }
}
</script>
