<template>
<div>

  <v-snackbar v-model="addTripSnackbar" :timeout="4000" top color="success">
      <span>Trip successfully added!</span>
      <v-btn text color="white" @click="addTripSnackbar = false">Close</v-btn>
  </v-snackbar>

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
          <v-list-item-subtitle>{{ displayDates(trip.dates) }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content v-else>
          <edit-trip-form 
            :tripInfo="{ title: trip.title, dates: trip.dates, description: trip.description, completed: trip.completed, isEditing: trip.isEditing, isActive: trip.isActive, id: trip.id }"
            @cancelEdits="trip.isEditing=false"
          />
          <!-- <v-card>
            <v-form class="mx-3" ref="form">
              <v-text-field 
                label="Trip name*" 
                :value="trip.title"
                :rules="inputRules"
              ></v-text-field>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="trip.dates"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :value="trip.dates"
                    :v-model="getDates(trip.dates)"
                    label="Trip dates*"
                    readonly
                    :rules="inputRules"
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  no-title
                  v-model="trip.dates"
                  range
                >
                  <v-spacer></v-spacer>
                  <v-btn @click="menu=false" text color="primary">Cancel</v-btn>
                  <v-btn @click="$refs.menu[index].save(['putting in random strings', 'my newest date is here'])" text color="primary">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-form>
            <v-card-actions>
                <v-btn text small class="success">Save</v-btn>
                <v-btn @click="trip.isEditing = false" text small class="warning">Cancel</v-btn>
                <v-btn @click="deleteTrip(trip.id)" text small class="error"><v-icon small>delete</v-icon></v-btn>
            </v-card-actions>
          </v-card> -->
        </v-list-item-content>


        <v-btn v-if="!trip.isEditing" @click="trip.isEditing=true" x-small text><v-icon small>edit</v-icon></v-btn>
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
      // inputRules: [
      //   v=> (v && v.length >= 1) || 'Field is required' 
      // ],
      menu: false,
      addTripSnackbar: false,
      date: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
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
      // this.deleteTripSnackbar = true
    },
    // clearEdits(trip) {
    //   trip.isEditing = false

    // }
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
          // this.updateDisplay(change.doc)
          console.log('something changed')
        }
      })
    })
  }
}
</script>