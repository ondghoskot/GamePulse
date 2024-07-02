<template>
  <div class="gp_mainslider">
    <Hooper :infiniteScroll="true" >
      <slide :key="game.id" v-for="game in games" :index="game.id">
        <img
          @click="$router.push('/games/' + game?.id)"
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
          <div class="genres">
            <h4>genres:</h4><br>
            <span v-for="(genre, index) in game.genres" :key="index" class="genre">{{ genre }}</span>
          </div>
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
            img: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExenBmbTRldjdtMTNxaGFvajUxcWtwanRvb2F2MWI0eXVma2g2YmRwbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MydKZ8HdiPWALc0Lqf/giphy.gif",
          },
        ];
      },
    },
  },
  data() {
    return {
      games: [],
    };
  },
  created() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      try {
        const response = await this.$axios.get("/games");
        console.log(response);
        if (response.status === 200) {
          this.games = response.data;
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gp_mainslider {
  width: 100vw;
  height: 100vh; 
  padding: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #101010;

  &__info {
    background: rgba(0, 0, 0, 0.8); 
    color: #fff;
    padding: 2rem;
    width: 50%;
    max-height: fit-content;
    text-align: left;
    border-radius: 10px; 
    

    h1 {
      margin-top: 0;
      font-size: 2.5rem; 
      line-height: 1.2;
    }

    p {
      margin-top: 1rem;
      color: #ccc;
      font-size: 1rem;
      line-height: 1.5;
      text-align: center;
    }

    h5 {
      margin-top: 1rem;
      color: #999;
      font-size: 1rem;
      opacity: 0.6;
      text-align: right;
    }

    .genres {
      margin-top: 1rem;
      
      h4 {
        font-size: 1.2rem;
        color: #ddd;
        text-decoration: underline;
        
      }

   
    }
  }
}

.hooper {
  height: 100vh;
}

img {
  width: 50%;
  height: auto;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); 
}

.hooper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hooper-navigation {
  fill: #fff;
  margin: 0 1rem;
}
</style>
