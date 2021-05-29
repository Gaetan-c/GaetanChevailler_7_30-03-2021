<template>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Georgia, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;

    &.router-link-exact-active {
      color: darkgray;
    }
  }
}
</style>
