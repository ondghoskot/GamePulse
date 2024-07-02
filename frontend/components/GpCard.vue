<template>
  <div
    :class="[wide ? 'gp_card--wide' : 'gp_card', info ? 'gp_card__info' : '']"
  >
    <img v-if="card?.img" :src="card.img" alt="" />
    <gp-rating-indicator
      v-if="card?.rating"
      :rating="card.rating"
    ></gp-rating-indicator>
    <div
      v-if="wide && showDetailsAction"
      @click="$router.push('/games/' + card?.id)"
      class="gp_card--wide__actions"
    >
      <span>Learn more</span>
    </div>
    <div class="gp_card__info__section" v-if="info">
      <div>
        <h2 class="p-1">{{ card.title }}</h2>
        <p class="p-1">{{ card.summary }}</p>
      </div>
      <div class="gp_card__info__footer">
        <h5 class="p-1 text-sm">
          {{
            new Date(card.releaseDate).getDay() +
            " " +
            new Date(card.releaseDate).toLocaleString("default", {
              month: "long",
            }) +
            " " +
            new Date(card.releaseDate).getFullYear()
          }}
        </h5>
        <p class="text-sm">
          <span v-if="card?.platforms">{{ card.platforms }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GpCard",
  props: {
    wide: {
      type: Boolean,
      default() {
        return false;
      },
    },
    showDetailsAction: {
      type: Boolean,
      default() {
        return true;
      },
    },
    info: {
      type: Boolean,
      default() {
        return false;
      },
    },
    card: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.gp_card {
  cursor: pointer;
  position: relative;
  .gp_rating__indicator {
    left: 1rem;
    top: 1rem;
  }
  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
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
      object-fit: cover;
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
    }
  }
}
</style>
