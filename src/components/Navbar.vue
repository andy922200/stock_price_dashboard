<template>
  <b-navbar type="light" variant="light" class="navbar--custom">
    <label for="searchInput"></label>
    <input
      type="text"
      class="form-control form-control--custom"
      id="searchInput"
      placeholder="請輸入代碼"
    />
    <b-button variant="outline-info" class="my-2 my-sm-0" type="submit"
      >搜尋</b-button
    >
  </b-navbar>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss" src="./../styles/Navbar.scss"></style>
