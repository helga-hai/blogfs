import { ConfigsState } from './state';

export default {
  lang(state: ConfigsState, payload: string): void {
    state.lang = payload;
  },
};
