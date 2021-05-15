import type { ActionContext } from 'vuex';
import type { LayoutState } from './LayoutState';

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
}
