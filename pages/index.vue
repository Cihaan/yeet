<template>
  <div class="home">
    <header>
      <h1>Welcome to Yeet !</h1>
      <p>You don't know what to eat for your next meal ? You're at the good place !</p>
      <p>Yeet gives you ideas by simply clicking a button, come on, try it.</p>
    </header>
    <div class="yeet">
        <button @click="onYeetClick">Yeet</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();

const onYeetClick = () => {
    fetch(config.public.apiBase+ 'list?from=0&size=100&tags=under_30_minutes', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': config.apiKey,
            'X-RapidAPI-Host': config.apiHost
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log (data)
        });
}


</script>

<style scoped lang="scss">
div.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    width: 100vw;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    color: #333;
    text-align: center;
    gap: 10px;
    h1 {
        font-size: 2.5rem;
        font-weight: 700;
    }
    p {
        margin: 0px;
    } 
}

div.yeet {
    margin-top: 2rem;
    button {
        background-color: #333;
        color: #fff;
        border: none;
        border-radius: 0.5rem;
        padding: 1rem 2rem;
        font-size: 1.5rem;
        font-weight: 700;
        cursor: pointer;
        &:hover {
            background-color: #555;
        }
    }
}
</style>
