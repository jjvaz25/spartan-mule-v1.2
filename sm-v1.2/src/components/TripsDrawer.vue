<template>
<div>

  <v-snackbar v-model="addTripSnackbar" :timeout="4000" top color="success">
      <span>Trip successfully added!</span>
      <v-btn text color="white" @click="addTripSnackbar = false">Close</v-btn>
  </v-snackbar>

  <!-- <v-navigation-drawer
    permanent
    class="grey lighten-3"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">My Trips</v-list-item-title>
        </v-list-item-content>
        <v-btn text><v-icon>add</v-icon></v-btn>
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
  </v-navigation-drawer> -->

  <v-navigation-drawer
    permanent
    class="grey lighten-3"

  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">My Trips</v-list-item-title>
        </v-list-item-content>
        <!-- <v-btn text><v-icon>add</v-icon></v-btn> -->
        <add-trip-form @tripAdded="addTripSnackbar = true"/>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line>
      <v-subheader>Upcoming</v-subheader>
      <v-list-item
        v-for="trip in upcomingTrips" :key="trip.id"
      >
        
        <v-list-item-content v-if="!trip.isEditing">
          <v-list-item-title>{{ trip.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ trip.dates }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content v-else>
          <v-card>
            <v-form class="mx-3" ref="form">
            <v-text-field label="Trip name*" :value="trip.title"></v-text-field>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-on="on"
                  v-model="dateRangeText"
                  label="Trip dates*"
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="dateRange"
                range
                no-title
              >
                <v-spacer></v-spacer>
                <v-btn @click="menu = false">Cancel</v-btn>
                <v-btn>OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-form>
          <v-card-actions>
              <!-- <v-spacer></v-spacer> -->
              <v-btn text small class="success">Save</v-btn>
              <v-btn text small class="warning">Cancel</v-btn>
              <v-btn text small class="error"><v-icon small>delete</v-icon></v-btn>
          </v-card-actions>
        </v-card>
        </v-list-item-content>


        <v-btn v-if="!trip.isEditing" x-small text><v-icon small>edit</v-icon></v-btn>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    
    <v-list two-line>
      <v-subheader>Past adventures</v-subheader>

      <v-list-item
        v-for="trip in pastAdventures" :key="trip.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{ trip.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ trip.dates }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</div>
</template>

<script>
import db from '../fb'
import AddTripForm from './AddTripForm'

export default {
  name: 'TripsDrawer',
  components: {
    'add-trip-form': AddTripForm
  },
  data() {
    return {
      trips: [
        // { title: 'Galapagos', dates: ['2020-01-29', '2020-02-02'], description: 'Insert description', completed: false, isEditing: true, isActive: false },
        // { title: 'San Diego', dates: ['2020-02-02', '2020-02-15'], description: 'Insert description', completed: false, isEditing: false, isActive: false },
        // { title: 'Washington DC', dates: '2020-03-04", "2020-03-15', description: 'Insert description', completed: false, isEditing: false, isActive: false },
        // { title: 'Cape Cod', dates: '2020-01-01", "2020-01-15', description: 'Insert description', completed: true, isEditing: false, isActive: false },
        // { title: 'Boston', dates: '2010-12-01", "2019-12-26', description: 'Insert description', completed: true, isEditing: false, isActive: false },
      ],
      menu: false,
      dateRange: ['2020-01-29', '2020-02-02'],
      addTripSnackbar: false
    }
  },
  computed: {
    upcomingTrips() {
      return this.trips.filter(trip => !trip.completed);
    },
    pastAdventures() {
      return this.trips.filter(trip => trip.completed);
    },
    dateRangeText () {
      return [this.dateRange[0].substr(5,5), this.dateRange[1]].join(' to ')
    }
  },
  created() {
    db.collection('trips').orderBy('dates').onSnapshot(res => {
      const changes = res.docChanges();
      changes.forEach(change => {
        if (change.type === 'added') {
          this.trips.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        } else if (change.type === 'modified'){
          // this.updateDisplay(change.doc)
          console.log('something changed')
        }
      })
    })
  }
}
</script>