import cloneDeep from 'lodash/cloneDeep';
import type { CancelTokenSource } from 'axios';
import type { Error } from '~/interface/Error';

/**
 * The key to reset the data.
 */
export const reset: unique symbol = Symbol?.for('__reset__');

/**
 * Describes the common state.
 */
export interface CommonState {
  // Initial data.
  [reset]: any;
  // Readiness state.
  ready: boolean;
  // Blocking processes.
  loading: number;
  // Unexpected error.
  unexpectedError: Error;
  // Ajax cancel tokens.
  ajaxCancelTokens: Record<string, CancelTokenSource>;
}

/**
 * Create state with additional property for reset.
 * @param data Initial Data.
 * @returns Data with reset prop.
 */
export function createState<T>(data: Record<string, any>): T {
  return <any>{ ...data, [reset]: cloneDeep(data) };
}

/**
 * The initial state of the layout.
 * @category CommonStore
 */
export default createState<CommonState>({
  // Readiness state.
  ready: false,
  // Blocking processes.
  loading: 0,
  // Unexpected error.
  unexpectedError: null,
  // Ajax cancel tokens.
  ajaxCancelTokens: null
});
