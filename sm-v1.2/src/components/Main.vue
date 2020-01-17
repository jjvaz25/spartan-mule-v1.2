<template>
  <div class="main">
    <trips-drawer />
  </div>
</template>

<script>
import TripsDrawer from './TripsDrawer'

export default {
  name: 'Main',
  components: {
    'trips-drawer': TripsDrawer,
  },
  data() {
    return {

    }
  },
};
</script>
