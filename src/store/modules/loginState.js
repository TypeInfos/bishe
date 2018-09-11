// 由于用的modules模式，所以不同modules state命名可以一样，但是getters中的名称不能一样
const id = {
  lhr: 'lajbffnlgcnmlkkbbogpkpgjkfmpmjbf',
  kzp: 'hnchopnjjannphjdengkbapneapdoadh',
  test: 'cpnmealmpgcapggbgjgfahpiifbbooef',
  online: 'lnbdcilfaojoldgckojoidnafpagkjbn',
  testVersion: 'cpnmealmpgcapggbgjgfahpiifbbooef'
};
const state = {
  isLogin: false,
  bindTaobaoName: '',
  editorExtensionId: id.test, // 插件ID
};
// mutations
const mutations = {
  login(state) {
    state.isLogin = true;
  },
  logout(state) {
    state.isLogin = false;
  },
  setTaobaoName(state, payload) {
    state.bindTaobaoName = payload.name;
  },
};
// actions
const actions = {
  login(context) {
    context.commit('login');
  },
  logout(context) {
    context.commit('logout');
  },
  setTaobaoName(context, payload) {
    context.commit('setTaobaoName', payload);
  },
};

const getters = {
  login: state => state.isLogin,
  taobaoName: state => state.bindTaobaoName,
  editorExtensionId: state => state.editorExtensionId,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
