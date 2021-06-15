import type { MutationPayload } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { CommonState } from '~/store/state';
// import { reset, CommonState } from '~/store/state';
import type { Error } from '~/interface/Error';

// Mutations are the only way to actually change
// state in the store and must be synchronous.
export default {

  /**
   * Set unexpected blocking error caused by the system.
   * @param state Common State.
   * @param error Unexpected error.
   */
  setUnexpectedError(state: CommonState, error: Error): void {
    state.unexpectedError = error;
  },
};
