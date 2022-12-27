<template>
    <div class="loading">
        <h1>Hello world</h1>
        <div class="loading__spinner"></div>
    </div>
</template>

<script setup lang="ts">

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