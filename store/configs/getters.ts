import { ConfigsState } from './state';

export default {
  activeLang(state: ConfigsState): string {
    return state.lang;
  },
  availableLangs(state: ConfigsState): string[] {
    return state.langs;
  },
};
