import type { Error } from '~/interface/Error';

/**
 * Describes the common state.
 */
export interface CommonState {
  // Unexpected error.
  unexpectedError: Error | null;
}

/**
 * The initial state of the layout.
 * @category CommonStore
 */
export default (): CommonState => ({
  // Unexpected error.
  unexpectedError: null,
});
