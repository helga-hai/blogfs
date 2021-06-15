/**
 * Describes the configs state.
 */
export interface ConfigsState {
  lang: string;
  langs: string[];
}

/**
 * The initial state of the layout.
 * @category ConfigsState
 */
export default (): ConfigsState => ({
  lang: '',
  langs: ['ru', 'en'],
});
