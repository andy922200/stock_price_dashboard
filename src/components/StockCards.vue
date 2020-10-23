<template>
  <div class="StockCards">
    <b-card
      no-body
      class="card--custom"
      v-for="stock in stocks"
      :key="stock.symbol"
    >
      <div class="priceInfo bg-white text-black">
        <div class="priceInfo__Code fifty-width">
          <p class="priceInfo__Code--custom">{{ stock.symbol }}</p>
        </div>
        <div class="priceInfo__detail fifty-width">
          <p>{{ stock.close }}</p>
        </div>
      </div>
      <div class="card__footer">
        <b-icon
          icon="arrow-up"
          scale="1"
          variant="success"
          class="icon--custom"
        ></b-icon>
        <span
          >{{ stock.change }} (
          {{
            stock.changePercent > 0
              ? `+${stock.changePercent}`
              : stock.changePercent
          }}% )</span
        >
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "StockCards",
  data() {
    return {
      stocks: [
        { symbol: "AAPL", close: 0.0, change: 0.0, changePercent: 1.05 },
        { symbol: "GOOL", close: 0.0, change: 0.0, changePercent: -2.01 }
      ]
    };
  },
  methods: {
    getStocksData() {
      // let symbols = this.stocks.map(d => d.symbol);
      // let result = [];
    }
  }
};
</script>

<style lang="scss" src="./../styles/StockCards.scss"></style>
