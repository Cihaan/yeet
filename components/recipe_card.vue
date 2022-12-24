<template>
  <div class="recipe">
    <div class="recipe__image">
      <img :src="recipe.thumbnail_url" :alt="recipe.name" />
    </div>
    <div class="recipe__info">
      <h2 class="recipe__title">{{ recipe.name }}</h2>
      <p class="recipe__description">{{ recipe.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  recipe: {
    type: Object,
    required: true,
  },
});

const { recipe } = props;
</script>

<style lang="scss" scoped>
.recipe {
  max-width: 600px;
  height: 600px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &__image {
    width: 100%;
    height: 50%;
    object-fit: contain;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__info {
    width: 100%;
    height: 50%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    &__title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    &__description {
      font-size: 1rem;
      font-weight: 400;
      margin-bottom: 1rem;
    }
  }
}
</style>
