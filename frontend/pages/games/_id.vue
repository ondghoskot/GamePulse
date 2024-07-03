<template>
  <div class="container">
    <div class="gp_mainslider__info pt-3 p-2 bg-dark">
      <gp-card
        class="pb-2"
        wide
        info
        :card="game"
        :showDetailsAction="false"
      ></gp-card>
    </div>
    <h1 class="p-2">Screenshots</h1>
    <carousel-3d v-if="game.screenshots && game.screenshots.length > 0">
      <slide v-for="(screenshot, index) in game.screenshots" :key="index" :index="index">
        <img :src="screenshot" alt="Screenshot" />
      </slide>
    </carousel-3d>
    <h1 class="p-2">Reviews</h1>
    <div class="add_button" v-show="!showReviewForm" @click="()=>{showReviewForm = true}">Add Review</div>
      <div class="review_form pt-3" v-show="showReviewForm">
        <div class="close_icon" @click="closeReviewForm"></div>
       <input
          v-model="titleData"
          type="text"
          placeholder="Title"
          required
        />
        <textarea v-model="summaryData" placeholder="How did you find the game?" required></textarea>
        <div class="star_rating pb-2">
          <star-rating v-model="ratingData" :star-size="40" active-color="#920092" active-border-color="#a65afa" :showRating="false"></star-rating>

        </div>
        <div :class="summaryData == '' || titleData == '' ? 'disabled_button' : ''" class="add_button pt-2" @click="submitReview ">Submit Review</div>
    </div>

    <div class="review_section pt-1">
      <div class="left-section">
        <div class="pb-1" v-if="reviews && reviews.length > 0">
          <gp-review-card v-for="review in reviews" :key="review._id" :review="review"></gp-review-card>
        </div>
         <div class="no_records p-2 text-center">

          No reviews found.
        </div>
      </div>
      <div class="right-section">
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import StarRating from 'vue-star-rating'


export default {
  components: {
    Carousel3d,
    Slide,
    StarRating
  },
  data() {
    return {
      titleData: '',
      summaryData: '',
      showReviewForm: false,
      ratingData: 0,
      game: {
        img: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExenBmbTRldjdtMTNxaGFvajUxcWtwanRvb2F2MWI0eXVma2g2YmRwbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MydKZ8HdiPWALc0Lqf/giphy.gif",

      },
      reviews: [],
    };
  },
  created() {
    const gameId = this.$route.params.id;
    if (gameId) {
      this.fetchGameDetails(gameId);
      this.fetchReviewsByGame(gameId);
    }
  },
  methods: {
    async submitReview(event){
      if(this.summaryData != "" && this.titleData != ''){
        try {
          const response = await this.$axios.post('/reviews', {
            gameId: this.game.id,
            rating: this.ratingData,
            title: this.titleData,
            review: this.summaryData
          }, {
            headers: {
          Authorization: `Bearer ${this.$store.state.token}`
        }
          });
          if (response.status === 201) {
            const newReview = response.data;
            this.reviews.unshift(newReview);
            this.showReviewForm = false; 
            this.ratingData = 0;
            this.titleData = ""; 
            this.summaryData = "";
          }
        } catch (error) {
          console.error('Error submitting review:', error);
        }

      }
    },
    closeReviewForm(event){
      this.showReviewForm = false;
      this.ratingData = 0;
      this.titleData = "";
      this.summaryData = "";
    },
    async fetchGameDetails(id) {
       try {
        const response = await this.$axios.get(`/games/${id}`);
        if (response.status === 200) {
          this.game = response.data;
          console.log(this.game);
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
     },
     async fetchReviewsByGame(gameId) {
      try {
        const response = await this.$axios.get(`/reviews/game/${gameId}`);
        if (response.status === 200) {
          this.reviews = response.data;
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.review_form{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 25rem;
  margin: auto;
}
input[type="text"]::placeholder,
textarea::placeholder{
  padding: .5rem;
  font-family: Helvetica;
}
input[type="text"],
textarea{
    height: 2.5rem;
    width: 25rem;
    max-width: 25rem;
    min-width: 25rem;
    margin-bottom: 1rem;
    background: #151515;
    border: 1px solid #a65afa;
    border-radius: 4px;
    color: #fff;
  }
  textarea{
    min-height: 7rem;
  }
.carousel-3d-container {
  margin: 20px auto 20px -6rem !important;
}
.no_records{
  border-top: 1px solid #333;
  color: #666;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: center;
  color: #fff;
}
img {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.carousel-3d-container,
.carousel-3d-slider {
  height: 20rem !important;
}
.carousel-3d-slide {
  width: 34rem !important;
  height: 20rem !important;
}
.review_section {
  margin: 0 2rem;
  display: flex;
  flex-direction: row;
  .left-section {
    width: 40rem;
    margin-left: auto;
    margin-right: auto;
  }
  
}
.disabled_button{
  background: #151515 !important;
  color: #666 !important;
  cursor: not-allowed !important;
}
.add_button {
    background: #a65afa;
    height: 3rem;
    padding: 1rem;
    width: 12rem;
    margin: auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    font-weight: 600;
    font-size: 1rem;
  }
.gp_mainslider__info{
  margin: auto;
  width: 65%;
  }
</style>
