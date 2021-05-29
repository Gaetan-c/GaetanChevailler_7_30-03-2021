<template>
  <div class="home">
    <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/Signup">Signup</router-link> |
    <router-link to="/Login">Login</router-link>
  </div>
    <img class="logo" alt="Logo groupomania" src="../assets/groupomaniaLogo.png" />
    <h2>Bienvenue sur le réseau social de Groupomania ! </h2>
    <router-link class="button" to="/Signup">S'inscrire</router-link>
    <router-link class="button" to="/Login">Se connecter</router-link>
    <img class="tasse" alt="Dessin de tasse de café" src="../assets/tassecafe.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">

    .home{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  
    .tasse, .logo{
      margin-top: 20px;
      width: 80%;
    }
    h2 {
        margin-bottom: 40px;
    }
    .button{
       
        height: 45px;
        width: 80%;
        color: black;
        background-color: lightgrey;
        text-decoration: none;
        font-size: 2em;
        border: double 2px black;
        border-radius: 50px;
        padding: 20px;
        margin: 10px;
    }
    .button:hover {
            background-color: darkgrey;
        }

@media screen and (min-width: 500px){
  .tasse, .logo{
      margin-top: 20px;
      width: 35%;
  }

  .button{
    width: 65%;
  }
}

</style>
