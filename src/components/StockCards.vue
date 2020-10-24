<template>
  <div class="StockCards">
    <h5 class="text-center">最後更新於：{{ dataTime }}</h5>
    <b-card
      no-body
      class="card--custom"
      v-for="(stock, index) in stocks"
      :key="stock.symbol + index"
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
          :icon="stock.typeIcon"
          scale="1"
          :variant="stock.typeColor"
          class="icon--custom"
        ></b-icon>
        <span>{{ stock.change }} ( {{ stock.changePercent }})</span>
      </div>
      <div class="card__popup" @click="deleteSymbol(index)">
        <div class="iconX"></div>
      </div>
    </b-card>
  </div>
</template>

<script>
import stocksAPI from "../utils/apis";
import _ from "lodash";
import dayjs from "dayjs";

export default {
  name: "StockCards",
  props: {
    newAddedSymbol: {
      type: String
    }
  },
  data() {
    return {
      dataTime: "1990 Jan 01",
      stocks: [
        {
          symbol: "AAPL",
          typeIcon: "arrow-up",
          typeColor: "success",
          close: "0.0",
          change: "0.0",
          changePercent: "+1.05%",
          updatedTime: "1990 Jan 01"
        },
        {
          symbol: "GOOG",
          typeIcon: "arrow-down",
          typeColor: "danger",
          close: "0.0",
          change: "0.0",
          changePercent: "-2.01%",
          updatedTime: "1990 Jan 01"
        },
        {
          symbol: "FB",
          typeIcon: "arrow-down",
          typeColor: "danger",
          close: "0.0",
          change: "0.0",
          changePercent: "-5.01%",
          updatedTime: "1990 Jan 01"
        },
        {
          symbol: "TSLA",
          typeIcon: "arrow-up",
          typeColor: "success",
          close: "0.0",
          change: "0.0",
          changePercent: "+15.01%",
          updatedTime: "1990 Jan 01"
        },
        {
          symbol: "VTI",
          typeIcon: "arrow-up",
          typeColor: "success",
          close: "0.0",
          change: "0.0",
          changePercent: "+15.01%",
          updatedTime: "1990 Jan 01"
        }
      ]
    };
  },
  created() {
    this.getStocksData();
  },
  methods: {
    async getStocksData() {
      try {
        let symbolGroups = _.chunk(
          this.stocks.map(d => d.symbol),
          3
        );
        let result = [];

        for (let i = 0; i < symbolGroups.length; i++) {
          let query = symbolGroups[i].join(",");
          let { data: rawData } = await stocksAPI.getStocks(query);

          if (rawData.historicalStockList) {
            for (let i = 0; i < rawData.historicalStockList.length; i++) {
              let formattedData = await this.formatStocksData(
                rawData.historicalStockList[i]
              );
              result.push(formattedData);
            }
          } else {
            let formattedData = await this.formatStocksData(rawData);
            result.push(formattedData);
          }
        }

        result.sort((a, b) => (a.symbol > b.symbol ? 1 : -1));

        this.stocks = result;
      } catch (err) {
        console.log(err);
      }
    },
    async formatStocksData(stock) {
      try {
        let result = {
          symbol: "ERROR",
          typeIcon: "arrow-up",
          typeColor: "success",
          close: "0.00",
          change: "0.00",
          changePercent: "+0.00%",
          updatedTime: "1990 Jan 01 00:00:00"
        };
        if (!stock.historical) return result;

        let closedChange = Number(
          stock.historical[0].close - stock.historical[1].close
        ).toFixed(2);

        result.symbol = stock.symbol;
        result.typeIcon = Number(closedChange) > 0 ? "arrow-up" : "arrow-down";
        result.typeColor = Number(closedChange) > 0 ? "success" : "danger";
        result.close = Number(stock.historical[0].close).toFixed(2);
        result.change = Math.abs(Number(closedChange));
        result.changePercent =
          Number((closedChange / stock.historical[1].close) * 100) > 0
            ? "+" +
              Number((closedChange / stock.historical[1].close) * 100).toFixed(
                2
              ) +
              "%"
            : Number((closedChange / stock.historical[1].close) * 100).toFixed(
                2
              ) + "%";
        result.updatedTime = dayjs(stock.historical[0].date).format(
          "YYYY MMM DD ddd"
        );
        this.dataTime = result.updatedTime;
        return result;
      } catch (err) {
        console.log(err);
      }
    },
    deleteSymbol(index) {
      this.stocks.splice(index, 1);
    }
  },
  watch: {
    newAddedSymbol: {
      async handler(newVal) {
        if (newVal) {
          if (this.stocks.length >= 5) {
            alert("顯示數量已達上限");
            return;
          }
          let { data: rawData } = await stocksAPI.getStocks(newVal);
          let formattedData = await this.formatStocksData(rawData);
          this.stocks.push(formattedData);
        }
      }
    }
  }
};
</script>

<style lang="scss" src="./../styles/StockCards.scss"></style>
