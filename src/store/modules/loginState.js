// 由于用的modules模式，所以不同modules state命名可以一样，但是getters中的名称不能一样
const state = {
  isLogin: false,
  bindTaobaoName: '',
<<<<<<< HEAD
  editorExtensionId:'ecieoimbedmijllodncamebieonaboff',  //本地ID
=======
  editorExtensionId: 'lemdejnloabdfhcinbhpedggonhdafhm', // 本地ID
>>>>>>> 1e2545eb603bae5da38983432d2e6ae350f6a171
  // lnbdcilfaojoldgckojoidnafpagkjbn   上线ID
  // cpnmealmpgcapggbgjgfahpiifbbooef  测试ID
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
