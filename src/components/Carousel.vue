<template>
  <div class="v-carousel">
    <div class="v-carousel--left" :class="{ active: scroll > 5 }">
      <v-btn fab small @click="scrollRight">
        <v-icon>chevron_left</v-icon>
      </v-btn>
    </div>
    <div class="v-carousel--right" :class="{ active: scroll+width < maxScroll-5 }">
      <v-btn fab small @click="scrollLeft">
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </div>
    <div class="v-carousel--items" ref="items" @scroll="onScroll">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data: () => ({
    scroll: 0,
    maxScroll: 0,
    width: 0,
  }),
  mounted() {
    this.onScroll();
  },
  methods: {
    scrollLeft() {
      this.$refs.items.scrollBy({
        left: this.$refs.items.clientWidth,
        behavior: 'smooth',
      });
    },
    scrollRight() {
      this.$refs.items.scrollBy({
        left: -this.$refs.items.clientWidth,
        behavior: 'smooth',
      });
    },
    onScroll() {
      this.maxScroll = this.$refs.items.scrollWidth;
      this.width = this.$refs.items.clientWidth;
      this.scroll = this.$refs.items.scrollLeft;
    },
  },
};
</script>

<style lang="scss">
  .application {
    .v-carousel {
      position: relative;
      background-color: inherit;
      width: 100%;

      .v-carousel--left,
      .v-carousel--right {
        display: flex;
        position: absolute;
        align-items: center;
        top: 0;
        bottom: 0;
        z-index: 2;
        opacity: 0;
        transition: opacity 0.2s;
        pointer-events: none;

        &.active {
          pointer-events: unset;
          opacity: 1;
        }
      }

      .v-carousel--left {
        left: 0;
        background: linear-gradient(to right,#fafafa,rgba(255,255,255,0));
      }

      .v-carousel--right {
        right: 0;
        background: linear-gradient(to left,#fafafa,rgba(255,255,255,0));
      }

      .v-carousel--items {
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;  // IE 10+
        overflow-x: auto;
        padding: 4px 0;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    &.theme--dark {
      .v-carousel--left {
        left: 0;
        background: linear-gradient(to right,#303030,rgba(0,0,0,0));
      }

      .v-carousel--right {
        right: 0;
        background: linear-gradient(to left,#303030,rgba(0,0,0,0));
      }
    }
  }
</style>
