import type { CancelTokenSource } from 'axios';
import type { CommonState } from './state';

// Getters are computable properties with an internal
// caching mechanism based on its dependencies.
export default {
  /**
   * Determine whether the functionality is in ready state.
   * @param state Common State.
   * @returns True in case state is ready; false otherwise.
   */
  isReady({ ready }: CommonState): boolean {
    return ready;
  },

  /**
   * Determine whether at least one loading process remains.
   * @param state Common State.
   * @returns True in case remains loading processes; false otherwise.
   */
  isLoading({ loading }: CommonState): boolean {
    return loading > 0;
  },

  /**
   * Determine whether exist blocking error caused by the system.
   * @param state Common State.
   * @returns True in case error exist; false otherwise.
   */
  hasError({ unexpectedError }: CommonState): boolean {
    return !!unexpectedError;
  },

  /**
   * Get ajax cancel tokens that can be used to stop requests.
   * @param state Common State.
   * @return Ajax cancel tokens.
   */
  ajaxCancelTokens({ ajaxCancelTokens }: CommonState): Record<string, CancelTokenSource> {
    return ajaxCancelTokens;
  }
};
