import type { LayoutState } from './LayoutState';

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
   * Set the visibility state of the footer.
   * @param state Layout state.
   * @param isVisible Visibility.
   */
  setFooter(state: LayoutState, isVisible: boolean): void {
    state.footer = isVisible;
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

  /**
   * Set the data related to the deposit notification.
   * @param state Layout state.
   * @param data Deposit data.
   */
  setNotifyDepositData(state: LayoutState, data: unknown): void {
    state.notifyDeposit = data;
  },

  /**
   * Set the data related to the conversion notification.
   * @param state Layout state.
   * @param data Conversion data.
   */
  setNotifyConversionData(state: LayoutState, data: unknown): void {
    state.notifyConversion = data;
  },

  /**
   * Set account blocked state.
   * @param state Layout state.
   * @param visible Account blocked popup visibility status.
   */
  setAccountBlocked(state: LayoutState, visible: boolean): void {
    state.accountBlocked = visible;
  },
};
