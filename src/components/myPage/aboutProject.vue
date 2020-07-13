<template>
    <b-container>
        <b-row>
            <b-col>
                <navbar></navbar>
            </b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col>
                <h4>About Project</h4>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import navbar from './navbar.vue';

export default {
  components: {
    navbar,
  },
};
</script>
