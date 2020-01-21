<template>
<div>

  <v-snackbar v-model="addTripSnackbar" :timeout="4000" top color="success">
      <span>Trip successfully added!</span>
      <v-btn text color="white" @click="addTripSnackbar = false">Close</v-btn>
  </v-snackbar>
  <v-snackbar v-model="deleteTripSnackbar" :timeout="4000" top color="success">
      <span>Trip successfully deleted!</span>
      <v-btn text color="white" @click="deleteTripSnackbar = false">Close</v-btn>
  </v-snackbar>

  <v-navigation-drawer
    permanent
    class="grey lighten-3"
    height="100%"
  >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">My Trips</v-list-item-title>
        </v-list-item-content>
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
          <v-list-item-subtitle>{{ displayDates(trip.dates) }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content v-else>
          <edit-trip-form 
            :tripInfo="{ title: trip.title, dates: trip.dates, description: trip.description, completed: trip.completed, isEditing: trip.isEditing, isActive: trip.isActive, id: trip.id }"
            @cancelEdits="trip.isEditing=false"
            @deleteTrip="deleteTrip"
          />
        </v-list-item-content>
        <v-btn v-if="!trip.isEditing" @click="trip.isEditing=true" x-small text><v-icon small>edit</v-icon></v-btn>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line>
      <v-subheader>Past adventures</v-subheader>
      <div class="subtitle-2">
        <div 
          class="ml-2"
          @click="showPastTrips = !showPastTrips"
        >
          <v-btn x-small text fab>
          <v-icon v-if="!showPastTrips">chevron_right</v-icon>
          <v-icon v-else>expand_more</v-icon>
          </v-btn>
          <span>Show previous trips</span>  
        </div>
      </div>
    </v-list>
    
    <v-list v-if="showPastTrips">
      <v-list-item
        v-for="trip in pastAdventures" :key="trip.id"
      >
        <v-list-item-content v-if="!trip.isEditing">
          <v-list-item-title>{{ trip.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ displayDates(trip.dates) }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content v-else>
          <edit-trip-form 
            :tripInfo="{ title: trip.title, dates: trip.dates, description: trip.description, completed: trip.completed, isEditing: trip.isEditing, isActive: trip.isActive, id: trip.id }"
            @cancelEdits="trip.isEditing=false"
            @deleteTrip="deleteTrip"
          />
        </v-list-item-content>
        <v-btn v-if="!trip.isEditing" @click="trip.isEditing=true" x-small text><v-icon small>edit</v-icon></v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</div>
</template>

<script>
import db from '../fb'
import AddTripForm from './AddTripForm'
import EditTtripForm from './EditTripForm'

export default {
  name: 'TripsDrawer',
  components: {
    'add-trip-form': AddTripForm,
    'edit-trip-form': EditTtripForm
  },
  data() {
    return {
      trips: [],
      menu: false,
      addTripSnackbar: false,
      deleteTripSnackbar: false,
      date: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
      showPastTrips: false
    }
  },
  methods: {
    displayDates(dates) {
      return `${dates[0].substr(5,5)} to ${dates[1].substr(5,5)}, ${dates[1].substr(0,4)}`
    },
    getDates(dates) {
      return dates
    },
    deleteTrip(id) {
      db.collection('trips').doc(id).delete()
      const index = this.trips.findIndex(item => item.id === id)
      this.trips.splice(index, 1)
      this.deleteTripSnackbar = true
    },
    updateDisplay(doc) {

      const index = this.trips.findIndex(trip => trip.id === doc.id)
      this.trips[index].title = doc.data().title
      this.trips[index].dates = doc.data().dates
      this.trips[index].description = doc.data().description
      this.trips[index].completed = doc.data().completed
      this.trips[index].isActive = doc.data().isActive
      this.trips[index].isEditing = doc.data().isEditing
    }
  },
  computed: {
    upcomingTrips() {
      return this.trips.filter(trip => !trip.completed);
    },
    pastAdventures() {
      return this.trips.filter(trip => trip.completed);
    },
    dateRangeText() {
      return [this.datesABC[0].substr(5,5), this.datesABC[1]].join(' to ')
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
          this.updateDisplay(change.doc)
        }
      })
    })
  }
}
</script>