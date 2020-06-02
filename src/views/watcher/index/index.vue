<template>
    <div class="watcher_owner">
        <left-all>
            <router-view/>
        </left-all>
    </div>
</template>

<script>
import leftAll from '@/components/manager_headleft/index.vue'
export default {
    components:{
        leftAll
    },
}
</script>

<style>

</style>