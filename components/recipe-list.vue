<template>
    <article class="recipe">
        <div class="recipe__image">
            <img :src="recipe.thumbnail_url" :alt="recipe.title" />
        </div>
        <div class="recipe__info">
            <h3 class="recipe__info__title">{{ recipe.name }}</h3>
            <p class="recipe__info__description">{{ recipe.description }}</p>
        </div>
    </article>
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
    width: 90%;
    height: 250px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 30px auto;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    &:hover {
        transform: scale(1.05);
    }

    &__image {
        width: 30%;
        height: 100%;
        object-fit: contain;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__info {
        width: 80%;
        height: 50%;
        display: flex;

        flex-direction: column;
        align-items: center;

        &__title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        &__description {
            font-size: 1rem;
            font-weight: 400;
            max-width: 1000px;
            margin-bottom: 1rem;
        }
    }
}
</style>