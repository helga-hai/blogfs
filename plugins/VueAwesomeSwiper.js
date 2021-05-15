import Vue from 'vue';
import vSwiper from 'vue-awesome-swiper';
import SwiperExporter from 'vue-awesome-swiper/dist/exporter';
import { Swiper, Pagination, Navigation, EffectFade,
  Mousewheel, Autoplay } from 'swiper/swiper.esm';
import 'swiper/swiper-bundle.css';

Swiper.use([Pagination, Mousewheel, Navigation, Autoplay, EffectFade]);
Vue.use(SwiperExporter(Swiper));
Vue.use(vSwiper);
