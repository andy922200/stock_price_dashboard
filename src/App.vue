<template>
  <div id="app">
    <div class="container">
      <Navbar />
      <StockCards />
    </div>
  </div>
</template>

<script>
import StockCards from "./components/StockCards.vue";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: { StockCards, Navbar }
};
</script>

<style lang="scss" src="./styles/app.scss"></style>
