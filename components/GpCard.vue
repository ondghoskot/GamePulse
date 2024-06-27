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
      @click="$router.push('/games/' + card?._id)"
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
      default() {
        return {
          title: "Hollow Knight",
          rating: 4.1,
          platforms: "Linux, PC (Microsoft Windows), Mac, Android",
          releaseDate: "2015-03-25",
          img: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/367520/capsule_616x353.jpg?t=1695270428",
          summary:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        };
      },
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
