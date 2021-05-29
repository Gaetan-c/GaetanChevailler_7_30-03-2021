<template>
  <div class="home">
    <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/Signup">Signup</router-link> |
    <router-link to="/Login">Login</router-link>
  </div>
    <img class="logo" alt="Logo groupomania" src="../assets/groupomaniaLogo.png" />
    <h2>Groupomania vous souhaite la bienvenue sur son réseau social !</h2>
    <div id="circle">
      <fieldset>
        <input v-model="dataSignup.username" id="name" type="text" placeholder="Votre nom" />
        <input v-model="dataSignup.email" id="email" type="email" placeholder="Votre email" />
        <input v-model="dataSignup.password" id="password" type="password" placeholder="Votre mot de passe" />
        <button type="submit" @click.prevent="createUser">S'inscrire</button>
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
  name: "Signup",
  data(){
    return {
      dataSignup: {
        username: null,
        email: null,
        password: null
      }
    }
  },
   methods: {
    createUser() {
      const validPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,200})/
      const validEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g
      const validUsername = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,40}$/
      
      if (
        (this.dataSignup.email !== null || this.dataSignup.username !== null || this.dataSignup.password !== null) &&
        (validPassword.test(this.dataSignup.password) && validEmail.test(this.dataSignup.email) && validUsername.test(this.dataSignup.username))
      ) {
        axios.post("http://localhost:3000/api/user/signup", this.dataSignup)
          .then(response => {
            console.log(response)
            this.dataSignup.email = null
            this.dataSignup.username = null
            this.dataSignup.password = null
            this.$router.push("Login")
          })
          .catch(error => console.log(error))
      } else {
        alert("Complétez correctement le formulaire pour vous s'inscrire")
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
  width: 270px;
  height: 270px;
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
  border: solid 2px black;
  font-size: 1em;
  border-radius: 5px;

  &:hover {
    background-color: lightgray;
  }
}

@media screen and (min-width: 560px) {
  .tasse,
  .logo {
    margin-top: 20px;
    width: 35%;
  }
}
</style>