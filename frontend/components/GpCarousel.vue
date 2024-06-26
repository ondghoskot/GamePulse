<template>
  <div class="gp_carousel">
    <h1 class="p-2">{{ title }}</h1>
    <carousel-3d>
      <slide :index="0"> <gp-card wide></gp-card></slide>
      <slide :index="1"> <gp-card wide></gp-card></slide>
      <slide :index="2"> <gp-card wide></gp-card></slide>
      <slide :index="3"> <gp-card wide></gp-card></slide>
      <slide :index="4"> <gp-card wide></gp-card></slide>
      <slide :index="5"> <gp-card wide></gp-card></slide>
      <slide :index="6"> <gp-card wide></gp-card></slide>
      <slide :index="7"> <gp-card wide></gp-card></slide>
      <slide :index="8"> <gp-card wide></gp-card></slide>
      <slide :index="9"> <gp-card wide></gp-card></slide>
    </carousel-3d>
  </div>
</template>
<script>
import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  name: "GpCarousel",
  props: {
    title: {
      type: String,
      default() {
        return "Most Played Games";
      },
    },
  },
  components: {
    Carousel3d,
    Slide,
  },
};
</script>
<style lang="scss" scoped>
.gp_carousel {
}

</style>
