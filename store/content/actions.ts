import type { ActionContext, ActionPayload } from 'vuex';
import { ContentStore } from './state';

/**
 * Actions are used to commit state mutations
 * and can contain asynchronous operations.
 * @category ContentStore
 */
export default {
  /**
   * Action used to show the news.
   * @param state Content state.
   * @param payload ActionPayload.
   */
  setNews({ commit }: ActionContext<ContentStore, unknown>, payload: ActionPayload): void {
    commit('setNews', payload);
  },
  /**
   * Action used to show the news.
   * @param state Content state.
   * @param payload ActionPayload.
   */
  setCategories({ commit }: ActionContext<ContentStore, unknown>, payload: ActionPayload): void {
    commit('setCategories', payload);
  },
};
