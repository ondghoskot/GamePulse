<template>
  <div class="gp_input">
    <div
      v-click-outside="
        () => {
          valueStr = '';
        }
      "
      class="gp_input__wrapper"
    >
      <input
        :placeholder="placeholder"
        @keypress="keypress"
        :type="type"
        v-model="valueStr"
      />
      <div class="gp_input__search"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GpSearchInput",
  data() {
    return {
      valueStr: "",
    };
  },
  props: {
    type: {
      type: String,
      default() {
        return "text";
      },
    },
    placeholder: {
      type: String,
      default() {
        return "Search...";
      },
    },
    value: {
      type: String,
      default() {
        return "";
      },
    },
  },
  methods: {
    keypress(event) {
      if (event.key === "Enter") {
        this.$emit("change", this.valueStr);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.gp_input {
  width: 5rem;
  display: flex;
}
.gp_input__wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  height: 9.39rem;
  $wrapper: &;

  .gp_input__search {
    position: absolute;
    margin: auto 0 auto 6rem;
    top: 0;
    right: 0rem;
    bottom: 0;
    left: 0;
    width: 3rem;
    height: 3rem;
    background: #151515;
    border: 1px solid #a65afa;
    border-radius: 50%;
    transition: all 1s;
    z-index: 4;
    box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 25px 0 #a65afa;
    &:hover {
      cursor: pointer;
    }
    &::before {
      content: "";
      position: absolute;
      margin: auto;
      top: 13px;
      right: 0;
      bottom: 0;
      left: 12px;
      width: 9px;
      height: 2px;
      background: white;
      transform: rotate(45deg);
      transition: all 0.25s;
    }
    &::after {
      content: "";
      position: absolute;
      margin: auto;
      top: -5px;
      right: 0;
      bottom: 0;
      left: -5px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      transition: all 0.25s;
    }
  }
  input {
    
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: -12rem;
    width: 50px;
    height: 50px;
    outline: none;
    // border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    background: #151515;
    border: 1px solid #a65afa;
    color: white;
    text-shadow: 0 0 10px #a65afa;
    padding: 0 80px 0 20px;
    border-radius: 30px;
    box-shadow: 0 0 25px 0 #a65afa, 0 20px 25px 0 rgba(0, 0, 0, 0.2);
    // box-shadow: inset 0 0 25px 0 rgba(0, 0, 0, 0.5);
    transition: all 1s;
    opacity: 0;
    z-index: 5;
    font-weight: bolder;
    letter-spacing: 0.1em;
    margin-right: 5.5rem;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      width: 400px;
      opacity: 1;
      cursor: text;
    }
    &:focus ~ .gp_input__search {
      z-index: 10 !important;
      right: -250px;
      background: #151515;
      margin: auto 0 auto 10.38rem;

      &::before {
        top: 0;
        left: 0;
        width: 25px;
      }
      &::after {
        top: 0;
        left: 0;
        width: 25px;
        height: 2px;
        border: none;
        background: white;
        border-radius: 0%;
        transform: rotate(-45deg);
      }
    }
    &::placeholder {
      color: white;
      opacity: 0.5;
      font-weight: bolder;
    }
  }
}
</style>
