<template>
  <div class="container">
    
    <h1 class="p-2">My Account</h1>
    <div class="account_info bg-dark">
      <ul class="text-left">
          <li>
            <h4>First Name</h4>
          </li>
          <li>
            <h4>Last Name</h4>
          </li>
          <li>
            <h4>Email</h4>
          </li>

      </ul>
       <ul>
          <li>
            <h4>{{profile?.firstName}}</h4>
          </li>
          <li>
            <h4>{{profile?.lastName}}</h4>
          </li>
          <li>
            <h4>{{profile?.email}}</h4>
          </li>

      </ul>
     
    </div>
    <h1 class="p-2">My Reviews</h1>
    

    <div class="review_section pt-1">
      <div class="left-section">
        <!-- <div class="pb-1" v-for="i in 10">
          <gp-review-card showEditActions></gp-review-card>
        </div> -->
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

    };
  },
  methods: {

  },
  async asyncData({ $axios}) {
   
      try {
        let details = await $axios.$get("/profile");
        if (details) {
         return { profile: details};
        }
      } catch (err) {
        console.log(err);
      }

  },
};
</script>

<style lang="scss" scoped>
ul{
  list-style: none;
  width: 12rem;
  &>li:not(&>li:last-child){
    margin-bottom: .35rem;
  }
  &:last-child{
    color: #666;
  }
  &:first-child{
    color: #999;
  }
}
.account_info{
  width: 40rem;
  margin: auto;
  padding: 2rem;
  display: flex;

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

</style>
