<template>
    <b-modal
        id="factory-request"
        ref="factory-request"
        hide-footer
    >
    <b-container>
      <b-row align-h="center">
        <b-col md="auto">
          <h4> There is will be</h4>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col md="auto">
          <h4> a Form of factory request</h4>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mt-3">
        <b-col md="auto">
          <h6>
            <div>At the moment</div>
            <div>It's final step</div>
          </h6>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mt-5 mb-5">
        <b-col md="auto">
          <b-icon icon="layout-text-window"
            font-scale="6"
          ></b-icon>
        </b-col>
      </b-row>
      <b-row align-h="center" class="mt-3 mb-5">
        <b-col md="auto">
          <b-button
            @click="hide"
            variant="primary">OK</b-button>
        </b-col>
      </b-row>
    </b-container>
    </b-modal>
</template>

<script>
export default {
  name: 'factoryRequest',
  methods: {
    show() {
      this.$refs['factory-request'].show();
    },
    hide() {
      this.$refs['factory-request'].hide();
    },
  },
};
</script>
