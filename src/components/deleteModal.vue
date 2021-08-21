<template>
  <q-card class="delete-dialoge-modal">
    <q-card-section class="row items-center q-pb-sm">
      <div class="text-h6">Delete Article</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-pb-xl">
     Are you sure to delete Article?
    </q-card-section>
    <q-card-actions align="right">
      <q-btn
        filled
        label="No"
        color="white"
        text-color="black"
        v-close-popup
      />
      <q-btn
        filled
        @click="onDeleteBtn"
        label="Yes"
        text-color="white"
        class="bg-red"
        v-close-popup
      />
    </q-card-actions>

  </q-card>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    onDeleteBtn () {
      this.$emit('deleteItem')
    }
  }
}
</script>
<style lang="scss">
  .delete-dialoge-modal {
    width: 500px;

    .q-card__section {
      border-bottom: 1px solid #ddd;
    }
  }
</style>