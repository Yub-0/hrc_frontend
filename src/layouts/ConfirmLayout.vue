<template>
  <div>
    <q-card class="card-shadow" style="width: 250px">
      <q-card-section class="row items-center q-pb-none text-center">
        <div class="text-h6">Are you sure?</div>
        <q-space />
      </q-card-section>

      <q-card-section align="right">
        <q-btn v-if="free" @click="freeFunc()" color="green-5" label="Yes" text />
        <q-btn v-else @click="confirm()" color="green-5" label="Yes" text />
        <q-btn v-close-popup color="red-5" class="q-ml-md" label="No" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    free: {}
  },
  methods: {
    confirm() {
      this.$emit("confirmItem");
    },
    freeFunc() {
      this.$emit("freeItem")
    }
  },
};
</script>
