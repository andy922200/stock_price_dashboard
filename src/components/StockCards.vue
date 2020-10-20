<template>
  <div class="StockCards">
    <b-card no-body class="card--custom">
      <div class="priceInfo bg-white text-black">
        <div class="priceInfo__Code fifty-width">
          <p class="priceInfo__Code--custom">Company Code</p>
        </div>
        <div class="priceInfo__detail fifty-width">
          <p>1013.45</p>
          <b-icon
            icon="arrow-up"
            scale="1"
            variant="success"
            class="icon--custom"
          ></b-icon>
          <span>32.56 ( 11.23% )</span>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "StockCards"
};
</script>

<style lang="scss" src="./../styles/StockCards.scss"></style>
