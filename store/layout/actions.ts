import { LayoutState } from './state';
import type { ActionContext } from 'vuex';

/**
 * Actions are used to commit state mutations
 * and can contain asynchronous operations.
 * @category LayoutStore
 */
export default {
  /**
   * Action used to show the overlay of the layout.
   * @param state Layout state.
   */
  showOverlay({ commit }: ActionContext<LayoutState, unknown>): void {
    commit('setOverlay', true);
  },

  /**
   * Action used to hide the overlay of the layout.
   * @param state Layout state.
   */
  hideOverlay({ commit }: ActionContext<LayoutState, unknown>): void {
    commit('setOverlay', false);
  },
};
