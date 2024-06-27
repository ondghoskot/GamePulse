<template>
  <div class="gp_header">
    <div class="gp_header__logo">
      <logo @click.native="$router.push('/')"></logo>
    </div>

    <div class="gp_header__actions">
      <gp-search-input @change="search"></gp-search-input>
      <gp-avatar></gp-avatar>
    </div>
  </div>
</template>
<script>
export default {
  name: "GpHeader",
  methods: {
    search(query) {
      this.$router.push("/search?q=" + query, () => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.gp_header {
  padding: 0.75rem;
  display: flex;
  min-height: 7rem;
  justify-content: space-between;
  border-bottom: 2px solid #a65afa;
  &__logo {
    width: 4rem;
    margin: 0.5rem 0 0 1rem;
  }
  &__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
}
</style>
