import axios from "axios";
const base_url = "https://financialmodelingprep.com/api/v3";
const apiKey = process.env.VUE_APP_API_KEY;

export const stocksAPIHelper = axios.create({
  baseURL: base_url
});

export default {
  getStocks(symbols) {
    return stocksAPIHelper.get(
      `/historical-price-full/${symbols}?apikey=${apiKey}`
    );
  }
};
