<template>
  <div class="main">
    <trips-drawer />
    <add-trip-form />
  </div>
</template>

<script>
import TripsDrawer from './TripsDrawer'
import AddTripForm from './AddTripForm'

export default {
  name: 'Main',
  components: {
    'trips-drawer': TripsDrawer,
    'add-trip-form': AddTripForm
  },
  data() {
    return {

    }
  },
};
</script>
