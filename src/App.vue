<template>
  <div v-if="$route.name=='WmsDashboard' || $route.name=='EmailVerification' || $route.name=='OTPVerification' || $route.name=='ResetPassword'" :class="{'main_wraper_wms' : !$route.path.includes('admin')}||{'container-fluid' : $route.path.includes('admin')}">  
      <Navbar v-if="$route.name!='WmsDashboard'" />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <v-app id=”app”>
      <router-view />
    </v-app>
  </div>
   <div v-else :class="{'main_wraper' : !$route.path.includes('admin')}||{'container-fluid' : $route.path.includes('admin')}">  
      <Navbar />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <v-app id=”app”>
      <router-view />
    </v-app>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: 'Inter',sans-serif, 'Avenir', Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  .v-application--wrap {
    background: #E5E5E5;
  }

  .v-data-table-header{
    white-space: nowrap;
  }
</style>
