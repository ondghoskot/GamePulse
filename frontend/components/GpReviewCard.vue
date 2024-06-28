<template>
  <div class="gp_reviewcard bg-dark">
    <gp-rating-indicator
      v-if="review?.rating"
      :rating="review.rating"
    ></gp-rating-indicator>

    <div class="gp_reviewcard__section">
      <div class="text-left">
        <p class="p-1 text-md">{{ review.summary }}</p>
      </div>
      <div class="gp_reviewcard__info__footer">
        <h5 class="p-1 text-sm" >
          <span v-if="!showEditActions">
            {{ review?.user.firstName + " " + review?.user.lastName }}
          |
          </span>
          {{
            new Date(review.createdAt).getDay() +
            " " +
            new Date(review.createdAt).toLocaleString("default", {
              month: "long",
            }) +
            " " +
            new Date(review.createdAt).getFullYear()
          }}
        </h5>

        <p class="text-sm">
          <span v-if="review?.platforms">{{ review.platforms }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GpReviewCard",
  props: {
    showEditActions: {
      type: Boolean,
      default() {
        return false;
      },
    },
    review: {
      type: Object,
      default() {
        return {
          user: {
            firstName: "Anass",
            lastName: "Chtioui",
            email: "anass.chtioui@gmail.com",
          },
          rating: 5,
          createdAt: "2022-03-5",
          summary:
            "Hollow Knight is an incredible game! The world is beautifully designed, and the music sets a perfect mood. The combat is tough but fair, and exploring Hallownest is super rewarding. The bosses are challenging, and the story unfolds in a really cool, subtle way. If you love Metroidvanias, you can't miss this one!",
        };
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.gp_reviewcard {
  cursor: pointer;
  position: relative;

  .gp_rating__indicator {
    right: 1rem;
    bottom: 1rem;
  }

  &--wide {
    .gp_rating__indicator {
      left: 0.75rem;
      top: 0.75rem;
    }
    &__actions {
      background: #66666673;
      position: absolute;
      font-size: 0.65rem;
      padding: 0.5rem 0.5rem;
      text-decoration: underline;
      right: 0.5rem;
      bottom: 3.5rem;
    }
    cursor: pointer;
    position: relative;
    display: flex;
    text-align: left;
    gap: 2rem;
    img {
      width: 27rem;
      height: 20rem;
    }
  }
  &__info {
    // padding: 1rem;
    &__section {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-right: 1.5rem;
      color: #666;
    }
  }
}
</style>
