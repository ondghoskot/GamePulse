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
    <carousel-3d>
      <slide :index="0">
        <img
          src="https://ip.trueachievements.com/remote/www.trueachievements.com/customimages/085538.jpg?width=900"
          alt=""
      /></slide>
      <slide :index="1">
        <img
          src="https://i.pinimg.com/originals/e4/6c/d9/e46cd932609864801ce2ae8312faf855.jpg"
      /></slide>
      <slide :index="2">
        <img src="https://i.imgur.com/zzX0Cqd.jpg" alt=""
      /></slide>
      <slide :index="3">
        <img
          src="https://ip.truetrophies.com/remote/www.truetrophies.com/customimages/052987.jpg?width=900"
          alt=""
      /></slide>
      <slide :index="4"
        ><img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvz3aoA_5ksboB_ZzP8Q2YLQOQPaRiZKEt8s8oSj2t2Xj_Th8xiiQNVt7qekP98anvm-o&usqp=CAU"
          alt=""
      /></slide>
      <slide :index="5"
        ><img
          src="https://www.cubed3.com/media/2017/February/hollowkn5.jpg"
          alt=""
      /></slide>
      <slide :index="6"
        ><img
          src="https://ip.truesteamachievements.com/remote/cdn.akamai.steamstatic.com/steam/apps/367520/ss_38ed9ff5af78d3ba9a5a2f2beb11879c83e69444.1920x1080.jpg%3Ft=1487959245?width=900"
          alt=""
      /></slide>
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
        <div class="pb-1" v-for="i in 10"><gp-review-card></gp-review-card></div>
        <!-- <div class="no_records p-2 text-center">

          No reviews found.
        </div> -->
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
        title: "Hollow Knight",
        rating: 4.1,
        releaseDate: "2015-03-22",
        platforms: "Linux, PC (Microsoft Windows), Mac, Android",
        img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg?t=1695270428",
        summary:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    };
  },
  methods: {
    submitReview(event){
      if(this.summaryData != "" && this.titleData != ''){

      }
    },
    closeReviewForm(event){
      this.showReviewForm = false;
      this.ratingData = 0;
      this.titleData = "";
      this.summaryData = "";
    }
  },
  async asyncData({ params, $axios}) {
    // if (params.id) {
    //   try {
    //     let details = await $axios.$get("/games/" + id);
    //     if (details) {
    //      return { game: details};
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
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
