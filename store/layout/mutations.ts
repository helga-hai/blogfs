import { LayoutState } from './state';

/**
 * Mutations are the only way to actually change
 * state in the store and must be synchronous.
 * @category LayoutStore
 */
export default {
  /**
   * Set the visibility state of the header.
   * @param state Layout state.
   * @param isVisible Visibility.
   */
  setHeader(state: LayoutState, isVisible: boolean): void {
    state.header = isVisible;
  },

  /**
   * Set the visibility state of the sidebar.
   * @param state Layout state.
   * @param isVisible Visibility.
   */
  setSidebar(state: LayoutState, isVisible: boolean): void {
    state.sidebar = isVisible;
  },

  /**
   * Set the visibility state of the overlay.
   * @param state Layout state.
   * @param isVisible Visibility.
   */
  setOverlay(state: LayoutState, isVisible: boolean): void {
    state.overlay = isVisible;
  },
};
