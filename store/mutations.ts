import type { MutationPayload } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { CommonState } from '~/store/state';
// import { reset, CommonState } from '~/store/state';
import type { Error } from '~/interface/Error';

// Mutations are the only way to actually change
// state in the store and must be synchronous.
export default {
  /**
   * Reset current state with initial data.
   * @param state Common State.
   */
  // resetState(state: CommonState): void {
  //   Object.assign(state, cloneDeep(state[reset]));
  // },

  /**
   * Set readiness state of functionality.
   * @param state Common State.
   * @param ready Readiness state.
   */
  setReady(state: CommonState, ready: boolean): void {
    state.ready = ready;
  },

  /**
   * Increase amount of blocking loading processes.
   * @param state Common State.
   */
  startLoading(state: CommonState): void {
    state.loading += 1;
  },

  /**
   * Decrease amount of blocking loading processes.
   * @param state Common State.
   */
  stopLoading(state: CommonState): void {
    state.loading -= 1;
  },

  /**
   * Reset amount of blocking loading processes.
   * @param state Common State.
   */
  resetLoading(state: CommonState): void {
    state.loading = 0;
  },

  /**
   * Set unexpected blocking error caused by the system.
   * @param state Common State.
   * @param error Unexpected error.
   */
  setUnexpectedError(state: CommonState, error: Error): void {
    state.unexpectedError = error;
  },

  /**
   * Set an ajax cancel token that can be used to stop request.
   * @param state Common State.
   * @param mutation Mutation Payload.
   */
  setAjaxCancelToken(state: CommonState, { type, payload }: MutationPayload): void {
    state.ajaxCancelTokens = { ...state.ajaxCancelTokens, [type]: payload };
  },

  /**
   * Stop an ajax request under Id using a cancel token.
   * @param state Common State.
   * @param id Unique Token Id.
   */
  cancelAjaxRequest(state: CommonState, id: string): void {
    if (state.ajaxCancelTokens?.[id]) {
      state.ajaxCancelTokens[id]?.cancel();
      delete state.ajaxCancelTokens[id];
    }
  },
};
