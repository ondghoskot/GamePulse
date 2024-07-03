<template>
  <div class="container">
    <gp-main-slider></gp-main-slider>

    <div class="bg-dark p-2">
      <h1>Featured games</h1>
      <div class="featured_content">
        <gp-card
        :key="index"
        v-for="(game, index) in featuredGames"
        @click.native="$router.push('/games/' + game.id)"
        :card="game"
      ></gp-card>
       <!-- <gp-card @click.native="$router.push('/games/' + '44')"></gp-card>
        <gp-card @click.native="$router.push('/games/' + '44')"></gp-card>
        <gp-card @click.native="$router.push('/games/' + '44')"></gp-card>
        <gp-card @click.native="$router.push('/games/' + '44')"></gp-card>
        <gp-card @click.native="$router.push('/games/' + '44')"></gp-card> -->
      </div>
    </div>

    <gp-carousel></gp-carousel>
  </div>
</template>

<script>
export default {
  auth:false,
  data() {
    return {
      featuredGames: [],
    };
  },
  created () {
    this.fetchFeaturedGames();
  },
  methods: {
    async fetchFeaturedGames() {
      try {
        const response = await this.$axios.get("/top-rated");
        console.log(response);
        if (response.status == 200) {
          this.featuredGames = response.data;
        }
      } catch (error) {
        console.error("Error fetching most played:", error);
      }
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.featured_content {
  display: grid;
  padding: 1rem;
  margin-top: 2rem;
  gap: 5rem;
  grid-template-columns: repeat(5, 1fr);
}
</style>
