<template>
  <div class="post">
    <h1>{{ post.User.username }}</h1>
    <hr>
    <p> {{ post.content }} </p>
    <p> {{ post.fichierJoint }} </p>
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
