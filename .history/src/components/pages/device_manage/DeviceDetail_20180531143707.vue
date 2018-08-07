<template>
    <md-content class="detail">
        <md-content class="header">

        </md-content>
        <md-content class="body
        ">

        </md-content>
    </md-content>
</template>

<script>
export default {
    name: 'device-detail',
    data() {
        return {
            currentItem: null
        }
    },
    methods: {

    },
    watch: {

    },
    created() {
        this.currentItem = this.$route.params.item
        console.log(this.currentItem)
    }
}
</script>

<style>

</style>
