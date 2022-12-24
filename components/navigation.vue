<template>
  <div>
    <ul>
        <p @click="onclick">Yeet</p>
      <nav>
        <nuxt-link  to="/recipes">Recipes</nuxt-link>
        <a href="https://github.com/Cihaan/yeet">Github</a>
      </nav>
    </ul>
  </div>
</template>

<script setup lang="ts">

const onclick = () => {
    const router = useRouter()
    router.push('/recipes')
}

</script>
<style lang="scss" scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  align-items: center;
  p {
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

    &.nuxt-link-active {
      color: var(--green);
    }
  }
}
</style>
