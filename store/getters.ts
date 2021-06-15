import type { CommonState } from '~/store/state';

// Getters are computable properties with an internal
// caching mechanism based on its dependencies.
export default {
  /**
   * Determine whether exist blocking error caused by the system.
   * @param state Common State.
   * @returns True in case error exist; false otherwise.
   */
  hasError({ unexpectedError }: CommonState): boolean {
    return !!unexpectedError;
  },
};
