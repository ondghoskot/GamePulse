<template>
  <div class="gp_avatar__wrapper">
    <div @click="openUserMenu" class="gp_avatar">
      <span>
        {{ getInitials() }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GpAvatar",
  methods: {
    getInitials(user = null) {
      return "AC";
      //   return (user.firstName[0] + user.LastName[0]).toUpperCase();
    },
    openUserMenu(event) {
      this.$router.push("/my-account");
    },
  },
};
</script>
<style lang="scss" scoped>
.gp_avatar {
  background: #151515;
  font-weight: 500;
  border-radius: 50%;
  font-size: 20px;
  border: 1px solid #a65afa;
  color: #fff;
  margin-right: 1.5rem;
  width: 3rem;
  height: 3rem;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &__wrapper {
    z-index: 9;
    position: relative;
  }
}
.gp_usermenu {
  background: #151515;
  border: 1px solid #a65afa;
  color: #fff;
  position: absolute;
  top: 3.5rem;
  right: 1.65rem;
  width: 15rem;
  height: 4rem;
  border-radius: 4px;
  display: none;

  &__item {
    display: flex;
    justify-content: space-between;
  }
}
</style>
