import state from './state';
import actions from './actions';
import mutations from './mutations';

// Namespaced Vuex module which contains its
// own state, actions, getters, mutations.
export default {
  state,
  actions,
  mutations,
  namespaced: true,
};
