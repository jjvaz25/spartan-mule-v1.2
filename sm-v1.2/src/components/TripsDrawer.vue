<template>
  <v-navigation-drawer
    permanent
    class="grey lighten-3"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">My Trips</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line>
      <v-subheader>Upcoming</v-subheader>
      <v-list-item
        v-for="(trip, index) in upcomingTrips" :key="index"
      >
        <v-list-item-content>
          <v-list-item-title>{{ trip.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ trip.dates }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    
    <v-list two-line>
      <v-subheader>Past adventures</v-subheader>

      <v-list-item
        v-for="(trip, index) in pastAdventures" :key="index"
      >
        <v-list-item-content>
          <v-list-item-title>{{ trip.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ trip.dates }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

export default {
  name: 'TripsDrawer',
  data() {
    return {
      trips: [
        { title: 'Galapagos', dates: '2020-01-29", "2020-02-02', description: 'Insert description', completed: false },
        { title: 'San Diego', dates: '2020-02-02", "2020-02-15', description: 'Insert description', completed: false },
        { title: 'Washington DC', dates: '2020-03-04", "2020-03-15', description: 'Insert description', completed: false },
        { title: 'Cape Cod', dates: '2020-01-01", "2020-01-15', description: 'Insert description', completed: true },
        { title: 'Boston', dates: '2010-12-01", "2019-12-26', description: 'Insert description', completed: true },
      ],
    }
  },
  computed: {
    upcomingTrips() {
      return this.trips.filter(trip => !trip.completed);
    },
    pastAdventures() {
      return this.trips.filter(trip => trip.completed);
    }
  }
}
</script>