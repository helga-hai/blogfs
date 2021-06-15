import type { ActionContext } from 'vuex';
import type { CommonState } from '~/store/state';

// Actions are used to commit state mutations
// and can contain asynchronous operations.
export default {
  /**
   * Action used to notify about an unexpected error caused by the system.
   * @param vuex Action Context.
   * @param error Unexpected Error.
   */
  setUnexpectedError({ commit }: ActionContext<CommonState, unknown>, error: Error): void {
    // Assign unexpected error to state and visualize to user.
    commit('setUnexpectedError', error);
  },
};
