<template>
  <!-- <div class="container">
    <h2>App Component</h2>
    <p class="icon-color" ><i class="fa-solid fa-coffee fa-4x"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
  </div> -->
  
<Navbaar/>
  <div class="container mt-2">  
    <router-view></router-view>
  </div>  
 
  


</template>

<script>
import Navbaar from '@/components/NavBaar.vue'

export default {
  name: 'App',
  components: {
   
    Navbaar,

  }
}



</script>


<style>
.icon-color {
  color: rgb(136, 8, 8);
}
</style>
