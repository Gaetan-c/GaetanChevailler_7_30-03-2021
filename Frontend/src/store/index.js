import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
  state: {
    user: {
      username: "",
      email: "",
      userId: "",
      token: null,
    }
  },
  mutations: {
    userState(state, [username, userId, email]){
      state.user.username = username,
      state.user.email = email,
      state.user.userId = userId,
      state.user.token = localStorage.getItem("token")
    }
  },
  actions: {
    getOneUser(params) {
      axios.get("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: "Bearer: " + localStorage.getItem("token")
          }
        })
        .then((response) => {
          params.commit("userState", [response.data.username, response.data.id, response.data.email])
        })
        .catch(error => { error })
    },
  },
  modules: {
  }
})
