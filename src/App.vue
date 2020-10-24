<template>
  <div id="app">
    <div class="container">
      <Navbar @addSymbol="deliverSymbol" />
      <h4 class="date text-center">{{ time }}</h4>
      <StockCards :newAddedSymbol="newAddedSymbol" />
    </div>
  </div>
</template>

<script>
import StockCards from "./components/StockCards.vue";
import Navbar from "./components/Navbar.vue";
import dayjs from "dayjs";

export default {
  name: "App",
  components: { StockCards, Navbar },
  data() {
    return {
      time: "1990 Jan 01 00:00:00",
      newAddedSymbol: ""
    };
  },
  created() {
    this.setNowTime();
  },
  methods: {
    setNowTime() {
      let utc = require("dayjs/plugin/utc");
      let timezone = require("dayjs/plugin/timezone");
      dayjs.extend(utc);
      dayjs.extend(timezone);
      this.time = dayjs()
        .tz("Asia/Taipei")
        .format("YYYY MMM DD ddd");
    },
    deliverSymbol(symbol) {
      this.newAddedSymbol = symbol;
    }
  }
};
</script>

<style lang="scss" src="./styles/app.scss"></style>
