<template>
<client-only placeholder="Loading...">
    <b-container>
        <b-row v-for="(item, index) in dataPost" :key="index">
            <b-col cols="12">
                <b-card
                    tag="article"
                    class="mb-3"
                >
                    <b-card-body>
                        <b-card-sub-title><span v-if="item.date_end">{{ item.date_start | moment("MMMM YYYY")}} - {{ item.date_end | moment("MMMM YYYY")}}</span> <span v-else>{{ item.date_start | moment("MMMM YYYY")}} - Today</span> </b-card-sub-title>
                        <b-card-text v-html="item.content"></b-card-text>
                        <b-card-text><small class="text-muted">Last updated {{item.date_time | moment("dddd, MMMM Do YYYY, HH:mm")}}</small></b-card-text>
                    </b-card-body>
                    
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</client-only>
</template>

<script>
export default {
    props:{
        dataPost:{
            type: Array
        }
    }
}
</script>

<style>

</style>