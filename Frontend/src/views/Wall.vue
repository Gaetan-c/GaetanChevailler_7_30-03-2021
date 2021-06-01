<template>
  <div class="home">
    <div class="nav">
      <img class="logo" alt="Logo groupomania" src="../assets/groupomaniaLogo.png" />
      <div class="profil" @click="profilPage"><fa icon="user" style="font-size: 1.5em"/></div>
      <div class="logout" @click="logout"><fa icon="power-off" style="font-size: 1.5em"/></div>
    </div>
    <div id="theWall">
      <div id="createPost">
        <input v-model="newPost.content" id="newPostContent" type="text" placeholder="Dites-le à vos collègues"/>
        <input @change="onChange" name="fichierJoint" type="file" id="fichierJoint" />
        <button type="submit" @click="sendNewPost">Envoyer</button>
      </div>
      <div v-for="post in allPosts" :key="post.id">
        <div>
          <p class="name"><b>{{ post.User.username }}</b></p>
          <br>
          <div>
            <p>{{ post.content }}</p>
          </div>
          <br>
          <img v-show="post.fichierJoint !== null && post.fichierJoint !== ''" :src="post.fichierJoint" alt="fichier joint à la publication" />
          <button v-show="isAdmin == 1 || User.id == post.userId" @click="deletePost(post)">Supprimer</button>
        </div>   
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios"
import Post from "@/components/Post"

export default {
  name: "Wall",
  component: {
    Post,
  },
  data(){
    return{
      post:{
        content: "",
        fichierJoint: "",
        id: ""
      },
      allPosts: [],
      newPost:{
        content: null,
        fichierJoint: null
      }
    }
  },
  mounted(){
      axios.get("http://localhost:3000/api/post", {
        headers : {
          'Content-Type': 'application/json',
          Authorization : "Bearer" + localStorage.getItem("token")
        }
      })
      .then(response => {
        this.allPosts = response.data
      })
      .catch(error => console.log(error))
    },
  methods: {
    
    profilPage(){
      this.$router.push("Profil")
    },
    logout(){
      localStorage.removeItem("token")
      this.$router.push("/")
    },
    onChange(event) {
      this.newPost.fichierJoint = event.target.files[0] || event.dataTransfer.files
    },
    sendNewPost(){
      const formData = new FormData()
      formData.append("fichierJoint", this.newPost.fichierJoint)
      formData.append("content", this.newPost.content)
    
      if (formData.get("fichierJoint") == "null" && formData.get("content") == "null") {
        console.log("Envoyer du vide ?")
      } else {
        axios
          .post("http://localhost:3000/api/post/createPost", formData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          })
          .then(response => {
            if (response) {
              window.location.reload()
            }
          })
          .catch(error => (error))
      }
    },
    /*updatePost(){
      axios.put("http://localhost:3000/api/post/updatePost,{

      })
    },
    deletePost(){
      axios.delete("http://localhost:3000/api/post/deletePost", {
      })
      .then(response => {
            if (response) {
              window.location.reload()
    }*/
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

#theWall {
  width: 98%;
  border-left: dashed 2px grey;
  border-right: dashed 2px grey;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  #createPost {
    background-color: lightgrey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 15px;
    padding: 10px 0px;
    border-radius: 10px;

    input {
      width: 80%;
      margin: 8px 0px;
      height: 25px;
    }

    #newPostContent {
      font-size: 1.5em;
      height: 45px;
    }

    button{
      height: 30px;
      width: 80%;
      margin: 5px;
      border: solid 2px black;
      font-size: 1em;
      color: white;
      background-color: darkgrey;

      &:hover {
        background-color: lightgrey;
        color: black;
      }
    }
  }
}

@media screen and (min-width: 500px) {
  #theWall {
  width: 80%;
  }
}

@media screen and (min-width: 800px) {
  #theWall {
  width: 60%;
  }
}

@media screen and (min-width: 1200px) {
  #theWall {
  width: 50%;
  }
}
</style>
