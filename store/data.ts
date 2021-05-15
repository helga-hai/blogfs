// Initial data of the game store, which is used
// to the initialize and reset of the state in case
// of route change.
export default {
  // Readiness state.
  ready: false,
  // Blocking processes.
  loading: 0,
  // Unexpected error.
  unexpectedError: null,
  // Ajax cancel tokens.
  ajaxCancelTokens: null
};
