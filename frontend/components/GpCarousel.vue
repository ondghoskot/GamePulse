<template>
  <div class="gp_carousel">
    <h1 class="p-2">{{ title }}</h1>
    <carousel-3d v-if="games && games.length > 0">
      <slide v-for="(game, index) in games" :key="index" :index="index">
        <gp-card :card="game" :wide="true"></gp-card>
      </slide>
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
  data() {
    return {
      games: [],
    };
  },
  created() {
    this.fetchMostPlayedGames();
  },
  methods: {
    async fetchMostPlayedGames() {
      try {
        const response = await this.$axios.get("/most-played");
        if (response.status === 200) {
          this.games = response.data;
          console.log(this.games);
        }
      } catch (error) {
        console.error("Error fetching most played games:", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
