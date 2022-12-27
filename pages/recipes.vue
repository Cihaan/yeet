<template>
  <div v-if="isLoading">
    <div class="loading">
      <div class="loading__spinner"></div>
    </div>
  </div>
  <div v-else v-for="recipe, index in recipes" :key="recipe.id">
    <recipe-list :recipe="recipe"></recipe-list>
  </div>
</template>

<script setup lang="ts">
const recipes = ref<any>([]);
const isLoading = ref(true);

onMounted(() => {
  fetch("/api/recipes")
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then((data) => {
      recipes.value = data.results;
      isLoading.value = false;
    });
});
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;

  &__spinner {
    border: 16px solid var(--gray);
    border-top: 16px solid var(--green);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
