import { createState } from '~/store/state';

/**
 * Describes the state of the layout.
 * @category LayoutStore
 */
export interface LayoutState {
  header: boolean;
  footer: boolean;
  sidebar: boolean;
  overlay: boolean;
  notifyDeposit: unknown;
  notifyConversion: unknown;
  accountBlocked: boolean;
}

/**
 * The initial state of the layout.
 * @category LayoutStore
 */
export const state = () => createState<LayoutState>({
  header: true,
  footer: true,
  sidebar: false,
  overlay: false,
  notifyDeposit: null,
  notifyConversion: null,
  accountBlocked: false,
});
