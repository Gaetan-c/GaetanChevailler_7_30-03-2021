<template>
  <div class="home">
    <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/Signup">Signup</router-link> |
    <router-link to="/Login">Login</router-link>
  </div>
    <img class="logo" alt="Logo groupomania" src="../assets/groupomaniaLogo.png" />
    <h2>Viens voir ce qu'il se raconte à la pause café !</h2>
    <div id="circle">
      <fieldset>
        <input v-model="dataLogin.email" id="email" type="email" placeholder="Votre email" />
        <input v-model="dataLogin.password" id="password" type="password" placeholder="Votre mot de passe" />
        <button type="button" @click="connectUser">Se connecter</button>
      </fieldset>
    </div>
    <img
      class="tasse"
      alt="Dessin de tasse de café"
      src="../assets/tassecafe.png"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"

export default {
  name: "Login",
  data(){
    return{
      dataLogin: {
        email: "",
        password: ""
      }
    }
  },
  methods: {
    connectUser(){
      if (this.dataLogin.username !== "" || this.dataLogin.password !== "") {

        axios.post("http://localhost:3000/api/user/login", this.dataLogin)
        .then(response => {
            localStorage.setItem("token", response.data.token)
            this.$router.push("Wall")
          })
        .catch(error => {
          console.log(error)
      })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.tasse,
.logo {
  margin-top: 20px;
  width: 80%;
}

#circle {
  display: flex;
  flex-flow: column;
  background-color: darkgrey;
  border: none;
  border-radius: 50%;
  box-shadow: 1px 1px 30px 1px black;
  width: 250px;
  height: 250px;
  margin-top: 35px;
  align-items: center;
  justify-content: center;
}

fieldset{
  border: none;
}

input {
  height: 30px;
  width: 80%;
  margin: 5px;
  border-radius: 5px;
}

button {
  height: 30px;
  width: 80%;
  margin: 5px;
  border: inset 2px black;
  font-size: 1em;
  border-radius: 5px;
}

button:hover {
  background-color: lightgray;
}

@media screen and (min-width: 560px) {
  .tasse,
  .logo {
    margin-top: 20px;
    width: 35%;
  }
}
</style>
