import Vue, { VNode } from 'vue';

import { DirectiveBinding } from 'vue/types/options';

// Extract the function out, up here, so I'm not writing it twice
const update = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) =>
  (el.style.visibility = binding.value ? 'hidden' : '');

/**
 * Hides an HTML element, keeping the space it would have used if it were visible (css: Visibility)
 */
Vue.directive('hidden', {
  // Run on initialisation (first render) of the directive on the element
  bind: update,
  // Run on subsequent updates to the value supplied to the directive
  update,
});
