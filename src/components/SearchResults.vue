<template>
  <li>
    <h3>{{ result.name }}</h3>
    <span>{{ result.breed_group }}</span>
    <span>{{ result.life_span }}</span>
    <span>{{ result.height.metric }}cm</span>
    <span>{{ result.weight.metric }}kg</span>
    <img
      class="breed_image"
      :src="`https://cdn2.thedogapi.com/images/${result.reference_image_id}.jpg`"
      :alt="`Picture of the ${result.name} dog`"
    />
  </li>
</template>

<script>
export default {
  props: ["result"],
};
</script>

<style scoped></style>
