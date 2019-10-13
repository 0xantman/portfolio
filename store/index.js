export const state = () =>({
    isAdmin: false
  })

  export const mutations = {
    update (state, isAdmin) {
        state.isAdmin = isAdmin;
    }
  }