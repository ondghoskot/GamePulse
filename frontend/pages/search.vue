<template>
  <div class="container">
    <div class="gp_query">
      <h3>Showing search results for:</h3>
      <h1>{{ query }}</h1>
    </div>

    <div class="gp_list__grid bg-dark">
      <div
        :key="indx + 'wrapper'"
        class="pb-2"
        v-for="(game, indx) in searchResults"
      >
        <gp-card class="pb-2" :key="indx" wide info :card="game"></gp-card>
        <hr :key="indx + 'separator'" />
      </div>
    </div>
  </div>
</template>

<script>
import GpCard from "../components/GpCard.vue";
export default {
  components: { GpCard },
  data() {
    return {};
  },
  async asyncData({ $axios, query }) {
    if (query?.q) {
      let searchResults = [
        {
          title: "Hollow Knight",
          rating: 4.1,
          releaseDate: "2018-09-12",
          img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg?t=1695270428",
          summary: "Lorem Ipsum is simply dummy text of the printing .",
        },
        {
          title: "Terraria",
          rating: 4.8,
          releaseDate: "2015-03-25",
          img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001702/dac3a26570b5ca1ddf703bf0add7cc7c527f71a2b56521baf69e20c7a573c610",
          summary:
            "Lorem Ipsum is simply dummy prot only five centuries, but also g and typesetting industry.g and typesetting industry.g and typesetting industry. of Lorem Ipsum.",
        },
        {
          title: "Super Meat Boy",
          rating: 3.3,
          releaseDate: "2022-11-09",
          img: "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000001990/cd98a2abfb3daabf755ee6230142a01cf1b2f717d8831093545595280539f1eb",
          summary:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's Ipsum.",
        },
      ];

      //   try {
      //     let results = $axios.$get("/games/search?keyword=" + query.q);
      //     searchResults = results.data;
      //   } catch (err) {
      //     console.log(err);
      //   }
      return { searchResults, ...{ query: query.q } };
    }
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
.gp_list__grid {
  display: grid;
  padding: 1rem 2rem;
}
.gp_query {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}
</style>
