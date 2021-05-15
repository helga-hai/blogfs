import { ConfigsState } from './state';

export default {
  // isMirror(state: ConfigsState): boolean {
  //   return state.mirror;
  // },
  // isPrerender(state: ConfigsState): boolean {
  //   return state.__PRERENDER__$;
  // },
  domain(state: ConfigsState): string {
    return state.cdnUrl ?? '';
  },
  activeLang(state: ConfigsState): string {
    return state.lang;
  },
  availableLangs(state: ConfigsState): string[] {
    return state.langs;
  },
};
