import Vue from 'vue'
import vMediaQuery from 'vue-mq'


// Configure media query plugin.
Vue.use(vMediaQuery, {
  breakpoints: {
    xs: 768,
    sm: 1024,
    md: 1200,
    lg: Infinity
  }
});
