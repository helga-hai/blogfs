import { ConfigsState } from './state';

export default {
  set(state: ConfigsState, configs: ConfigsState): void {
    Object.assign(state, configs);
  },
};
