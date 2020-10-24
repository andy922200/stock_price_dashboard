<template>
  <b-navbar type="light" variant="light" class="navbar--custom">
    <label for="searchInput"></label>
    <input
      type="text"
      v-model.trim="symbolQuery"
      class="form-control form-control--custom"
      id="searchInput"
      placeholder="請輸入一組美股代碼"
    />
    <b-button
      variant="outline-info"
      class="my-2 my-sm-0"
      type="button"
      @click="addSymbol"
      >新增</b-button
    >
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      symbolQuery: ""
    };
  },
  methods: {
    async addSymbol() {
      try {
        let validated = await this.validationSymbol();
        if (validated) {
          this.$emit("addSymbol", this.symbolQuery);
          this.symbolQuery = "";
        } else {
          alert("Please enter a valid symbol!");
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSymbol() {
      let rawInput = this.symbolQuery.toUpperCase();
      return /^[a-zA-Z]{1,6}$/.test(rawInput);
    }
  }
};
</script>

<style lang="scss" src="./../styles/Navbar.scss"></style>
