<template>
  <div id="app">
    <div class="container">
      <StockCards />
    </div>
  </div>
</template>

<script>
import StockCards from "./components/StockCards.vue";

export default {
  name: "App",
  components: { StockCards }
};
</script>

<style lang="scss" src="./styles/app.scss"></style>
