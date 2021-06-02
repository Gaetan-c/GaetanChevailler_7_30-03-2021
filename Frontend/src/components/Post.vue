<template>
 <div class="post">
    <p class="name"><b>{{ post.User.username }}</b></p>
    <br>
    <div>
      <p>{{ post.content }}</p>
    </div>
    <br>
    <img v-show="post.fichierJoint !== null && post.fichierJoint !== ''" :src="post.fichierJoint" contain alt="fichier joint à la publication" />
    <button  @click="deletePost(post)">Supprimer</button>
  </div> 
</template>

<script>
export default {
  name: 'Post',
  data() {
    return{}
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.post{
  background-color: beige;
}

</style>
