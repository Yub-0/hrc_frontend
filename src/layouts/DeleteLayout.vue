<template>
  <div>
    <q-card class="card-shadow" style="width: 250px">
      <q-card-section class="row items-center q-pb-none text-center">
        <div class="text-h6">Are you sure?</div>
        <q-space />

      </q-card-section>

      <q-card-section align="right">
        <q-btn @click="confirmComp()" color="green-5" label="Yes" text v-if="comp" />
        <q-btn @click="confirm()" color="green-5" label="Yes" text v-else />
        <q-btn v-close-popup color="red-5" class="q-ml-md" label="No" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
export default {
  methods: {
    confirm() {
      this.$emit("deleteItem")
    },
    confirmComp() {
      this.$emit("compDelete")
    }
  },
  props: { comp: {} }
}
</script>
