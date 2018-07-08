// 由于用的modules模式，所以不同modules state命名可以一样，但是getters中的名称不能一样
const state = {
  isLogin:false,
};
// mutations
const mutations = {
  login(state){
    state.isLogin = true;
  },
  logout(state){
    state.isLogin = false;
  }
};
// actions
const actions = {

  login(context){
    context.commit('login');
  },
  logout(context){
    context.commit('logout');
  }
  // checkout ({ commit, state }, products) {
  //  const savedCartItems = [...state.added]
  //  commit(types.CHECKOUT_REQUEST)
  //  shop.buyProducts(
  //    products,
  //    () => commit(types.CHECKOUT_SUCCESS),
  //    () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
  //  )
  // }
};

const getters = {
  login: state => state.isLogin,
};

export default {
  
  state,
  getters,
  actions,
  mutations,
};
