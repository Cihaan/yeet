<template>
  <div v-for="recipe in state.recipes" :key="recipe.id">
    <recipe-card :recipe="recipe"></recipe-card>
    <h2>{{ recipe.name }}</h2>
    <img :src="recipe.thumbnail_url" />
    <p>{{ recipe.description }}</p>
    <a :href="recipe.video_url">Video link</a>
  </div>
</template>

<script setup lang="ts">
const state = reactive<any>({
  recipes: null,
});
</script>

<style scoped></style>
