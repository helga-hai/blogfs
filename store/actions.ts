import keys from 'lodash/keys';
import forEach from 'lodash/forEach';
import type { ActionContext, ActionPayload } from 'vuex';
import type { CommonState } from '~/store/state';

// Actions are used to commit state mutations
// and can contain asynchronous operations.
export default {
  /**
   * Action used to reset the module state to initial data.
   * @param vuex Action Context.
   */
  // resetState({ commit }: ActionContext<CommonState, unknown>): void {
  //   commit('resetState');
  // },

  /**
   * Action used to change the ready state of the functionality.
   * @param vuex Action Context.
   * @param ready Readiness state.
   */
  setReady({ commit }: ActionContext<CommonState, unknown>, ready: boolean): void {
    commit('setReady', ready);
  },

  /**
   * Action used to notify about the start of the blocking process.
   * @param vuex Action Context.
   */
  startLoading({ commit }: ActionContext<CommonState, unknown>): void {
    commit('startLoading');
  },

  /**
   * Action used to notify that the blocking process has stopped.
   * @param vuex Action Context.
   */
  stopLoading({ commit }: ActionContext<CommonState, unknown>): void {
    commit('stopLoading');
  },

  /**
   * Action used to notify that all blocking processes have been reset.
   * @param vuex Action Context.
   */
  resetLoading({ commit }: ActionContext<CommonState, unknown>): void {
    commit('resetLoading');
  },

  /**
   * Action used to notify about an unexpected error caused by the system.
   * @param vuex Action Context.
   * @param error Unexpected Error.
   */
  setUnexpectedError({ commit }: ActionContext<CommonState, unknown>, error: Error): void {
    // Notify that all blocking processes has been stopped.
    commit('resetLoading');
    // Assign unexpected error to state and visualize to user.
    commit('setUnexpectedError', error);
  },

  /**
   * Action adds new cancel token that can be used to stop the request.
   * @param vuex Action Context.
   * @param payload Action Payload.
   */
  setAjaxCancelToken({ commit }: ActionContext<CommonState, unknown>, payload: ActionPayload): void {
    commit('setAjaxCancelToken', payload);
  },

  /**
   * Action used to stop all ajax requests with the cancel tokens.
   * @param vuex Action Context.
   */
  cancelAjaxRequests({ commit, state }: ActionContext<CommonState, unknown>): void {
    forEach(keys(state.ajaxCancelTokens), (id: string): void => {
      commit('cancelAjaxRequest', id);
    });
  },

  /**
   * Action used to stop ajax request by the specified token Id.
   * @param vuex Action Context.
   * @param id Unique Token Id.
   */
  cancelAjaxRequest({ commit }: ActionContext<CommonState, unknown>, id: string): void {
    commit('cancelAjaxRequest', id);
  },
};
