<template>
  <div>
    <ul>
      <nuxt-link id="yeet" to="/">Yeet</nuxt-link>
      <nav>
        <nuxt-link to="/recipes">Recipes</nuxt-link>
        <a href="https://github.com/Cihaan/yeet">Github</a>
      </nav>
    </ul>
  </div>
</template>

<script setup lang="ts">

</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  align-items: center;

  a#yeet {
    font-size: 2rem;
    font-weight: 600;
    color: var(--green);
    cursor: pointer;

    &:hover {
      color: var(--green-hover);
    }
  }

  nav {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  a {
    text-decoration: none;
    padding: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--gray);
    cursor: pointer;

    &:hover {
      color: var(--green-hover);
    }

    &.router-link-active {
      color: var(--green);
    }
  }
}
</style>
