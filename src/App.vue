<template>
  <v-app>
    <v-main>
      <Notes/>
    </v-main>
  </v-app>
</template>

<script>
import Notes from './components/Notes';

export default {
  name: 'App',

  components: {
    Notes,
  },

  data: () => ({
    //
  }),
};
</script>
