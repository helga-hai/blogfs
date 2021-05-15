import type { Swiper, SwiperOptions } from 'swiper';

/**
 * Describes data of the mixin.
 * @property swiperOptions Options.
 */
interface MixinData {
  swiperOptions: SwiperOptions;
}

/**
 * Swiper component mixin.
 * @type Vue
 */
export default {
  // Data of the mixin.
  data: (): MixinData => ({
    swiperOptions: {
      freeMode: true,
      freeModeMomentumBounce: false,
      freeModeMomentumRatio: 0.5,
      freeModeMomentumVelocityRatio: 0.5,
      preventClicks: true,
      preventClicksPropagation: false,
      slidesPerView: 'auto',
      touchReleaseOnEdges: true
    }
  }),
  // Mounted hook of the component.
  mounted(): void {
    setTimeout((): void => {
      this.swiper?.update();
      this.swiperClickPrevent();
    }, 200);
  },
  // Computed of the mixin.
  computed: {
    swiper(): Swiper {
      return this.$refs.swiper?.$swiper;
    }
  },
  // Methods of the mixin.
  methods: {
    swiperClickPrevent(): void {
      if (this.swiper) this.swiper.params.preventClicks = !(this.swiper.isBeginning && this.swiper.isEnd);
    }
  }
};
