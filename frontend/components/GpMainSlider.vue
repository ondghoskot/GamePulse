<template>
  <div class="gp_mainslider">
    <Hooper :infiniteScroll="true">
      <slide :key="indx" v-for="(game, indx) in games" :index="indx">
        <img
          @click="$router.push('/games/' + game?._id)"
          :src="game.img"
          alt=""
        />

        <div class="gp_mainslider__info">
          <h1>{{ game.title }}</h1>
          <p class="text-overflow">{{ game.summary }}</p>

          <h5 v-if="game?.releaseDate" class="text-sm">
            {{
              new Date(game.releaseDate).getDay() +
              " " +
              new Date(game.releaseDate).toLocaleString("default", {
                month: "long",
              }) +
              " " +
              new Date(game.releaseDate).getFullYear()
            }}
          </h5>
        </div>
      </slide>
      <hooper-navigation slot="hooper-addons"></hooper-navigation>
    </Hooper>
  </div>
</template>
<script>
import { Hooper, Slide, Navigation as HooperNavigation } from "hooper";
import "hooper/dist/hooper.css";

export default {
  name: "MainSlider",
  components: {
    Hooper,
    Slide,
    HooperNavigation,
  },
  props: {
    games: {
      type: Array,
      default() {
        return [
          {
            title: "Hollow Knight",
            rating: 4.1,
            releaseDate: "2015-03-25",
            img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg?t=1695270428",
            summary:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            title: "Terraria",
            rating: 4.8,
            releaseDate: "2005-10-01",
            img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001702/dac3a26570b5ca1ddf703bf0add7cc7c527f71a2b56521baf69e20c7a573c610",
            summary: "Loremm.",
          },
          {
            title: "Super Meat Boy",
            rating: 3.3,
            releaseDate: "2022-09-11",
            img: "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000001990/cd98a2abfb3daabf755ee6230142a01cf1b2f717d8831093545595280539f1eb",
            summary:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        ];
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.gp_mainslider {
  width: 100vw;
  height: 46rem;
  // position: absolute;
  top: 0;
  padding: 5rem;
  &__info {
    background: #151515;
    color: #fff;
    padding: 2rem;
    width: 100%;
    height: 38rem;
    max-height: fit-content;
    text-align: left;
    h1 {
      margin-top: 2rem;
    }
    p {
      margin-top: 3rem;
      color: #999;
    }
    h5 {
      position: absolute;
      bottom: 3rem;
      color: #666;
      width: 100%;
    }
  }
}
.hooper {
  height: 45vh;
}
img {
  width: 65rem;
  height: 38rem;
  object-fit: cover;
  cursor: pointer;
}
.hooper-slide {
  display: flex;
}
.hooper-navigation {
  fill: #fff;
}
</style>
