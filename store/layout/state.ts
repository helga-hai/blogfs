/**
 * Describes the state of the layout.
 * @category LayoutStore
 */
export interface LayoutState {
  header: boolean;
  footer: boolean;
  sidebar: boolean;
  overlay: boolean;
}

/**
 * The initial state of the layout.
 * @category LayoutStore
 */
export default (): LayoutState => ({
  header: true,
  footer: true,
  sidebar: false,
  overlay: false,
});
