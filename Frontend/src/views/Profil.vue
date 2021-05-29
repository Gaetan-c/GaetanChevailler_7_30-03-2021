<template>
  <div class="home">
    <div class="nav">
      <img class="logo" alt="Logo groupomania" src="../assets/groupomaniaLogo.png" />
      <div class="profil" @click="wallPage"><fa icon="home" style="font-size: 1.5em"/></div>
      <div class="logout" @click="logout"><fa icon="power-off" style="font-size: 1.5em"/></div>
    </div>
    <div id="theProfil">
      <figure></figure>
      <h1>{{ dataProfil.username }}</h1>
      <p>Personne inscrite depuis le: {{ dataProfil.user_date }}</p>
      <button class="delete" @click="deleteUser">Supprimer le compte</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"

export default {
  name: "Profil",
  data(){
    return{
      dataProfil: {
        username: null,
        user_date: null
      }
    }
  },
  mounted(){
    axios.get("http://localhost:3000/api/user/me", {
      headers : {
        Authorization : "Bearer" + localStorage.getItem("token")
      }
    })
    .then(response => {
      this.dataProfil.username = response.data.username
      this.dataProfil.user_date = response.data.createdAt
    })
    .catch(error => error)
  },
  methods: {
    wallPage(){
      this.$router.push("Wall")
    },
    logout(){
      localStorage.removeItem("token")
      this.$router.push("/")
    },
    deleteUser() {
      axios.delete("http://localhost:3000/api/user/delete", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(() => {
        localStorage.clear()
        this.$router.push("/")
      })
      .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.logo{
  width: 60%;
}

.nav {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: auto;
  width: 100%;
  background-color: lightgrey;
}

.profil, .logout{
  color: black;
  transition: 250ms;
  font-size: 1.5em;

  &:hover{
    font-size: 1.6em;
    color: darkred;
  }
}

#theProfil {
  figure {
    background-color: grey;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
}

.delete{
  border-radius: 10px;
  background: black;
  border-color: black;
  color: white;
  font-size: 1.2em;
  height: 25px;
  transition: 200ms;

  &:hover{
    background: darkred;
    border-color: darkred;
  }
}

</style>
