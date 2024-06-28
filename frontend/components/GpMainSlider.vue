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
              "A 2D metroidvania with an emphasis on close combat and exploration in which the player enters the once-prosperous now-bleak insect kingdom of Hallownest, travels through its various districts, meets friendly inhabitants, fights hostile ones and uncovers the kingdom's history while improving their combat abilities and movement arsenal by fighting bosses and accessing out-of-the-way areas.",
          },
          {
            title: "Terraria",
            rating: 4.8,
            releaseDate: "2005-10-01",
            img: "https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/software/switch/70010000001702/dac3a26570b5ca1ddf703bf0add7cc7c527f71a2b56521baf69e20c7a573c610",
            summary: "Dig, Fight, Explore, Build: The very world is at your fingertips as you fight for survival, fortune, and glory. Will you delve deep into cavernous expanses in search of treasure and raw materials with which to craft ever-evolving gear, machinery, and aesthetics? Perhaps you will choose instead to seek out ever-greater foes to test your mettle in combat? Maybe you will decide to construct your own city to house the host of mysterious allies you may encounter along your travels? In the World of Terraria, the choice is yours!",
          },
          {
            title: "Super Meat Boy",
            rating: 3.3,
            releaseDate: "2022-09-11",
            img: "https://assets.nintendo.com/image/upload/ar_16:9,b_auto:border,c_lpad/b_white/f_auto/q_auto/dpr_1.5/ncom/software/switch/70010000001990/cd98a2abfb3daabf755ee6230142a01cf1b2f717d8831093545595280539f1eb",
            summary:
              "Super Meat Boy is a tough-as-nails platformer where you play as an animated cube of meat who's trying to save his girlfriend (who happens to be made of bandages) from an evil fetus in a jar wearing a tux",
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
  height: 60rem;
  // position: absolute;
  top: 0;
  padding: 5rem;
  &__info {
    background: #151515;
    color: #fff;
    padding: 2rem;
    width: 100%;
    height: auto;
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
  height: 60vh;
}
img {
  width: 100%;
  height: auto;
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
