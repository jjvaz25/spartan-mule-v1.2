<template>
  <v-card>
    <v-form class="mx-3" ref="editForm">
      <v-text-field 
        label="Trip name*" 
        v-model="title"
        :rules="inputRules"
      ></v-text-field>
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            label="Trip dates*"
            v-model="dateRangeText"
            readonly
            v-on="on"
            :rules="inputRules"
          >
          </v-text-field>
        </template>
        <v-date-picker
          v-model="dates"
          no-title
          range
        >
          <v-spacer></v-spacer>
          <v-btn @click="menu=false" text color="primary">Cancel</v-btn>
          <v-btn @click="$refs.menu.save(dates)" text color="primary">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-form>
    <v-card-actions>
        <v-btn 
          text small class="success"
          :loading="loading"
          @click="submit"
        >Save</v-btn>
        <v-btn 
          text small class="warning"
          @click="$emit('cancelEdits')"
        >Cancel</v-btn>

        <v-dialog
          v-model="dialogOpen"
          max-width="300px"
        >
          <template v-slot:activator="{ on }">
            <v-btn text small class="error ml-2" v-on="on">
              <v-icon small>delete</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-center text-wrap">Are you sure you want to delete this trip?</v-card-title>
            <v-card-text>
              <v-form ref="deleteConfirmation">
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                text class="error"
                @click="dialogOpen = false"
              >No</v-btn>
              <v-spacer></v-spacer>
              <v-btn 
                text class="success"
                @click="$emit('deleteTrip', id)"
              >Yes</v-btn> 
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>



 
        <!-- <v-btn 
          text small class="error"
          @click="deleteTrip"
        ><v-icon small>delete</v-icon></v-btn> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import db from '../fb'

export default {
  name: 'EditTripForm',
  props: [
    'tripInfo'
  ],
  data() {
    return {
      menu: false,
      dialogOpen: false,
      loading: false,
      inputRules: [
        v=> (v && v.length >= 1) || 'Field is required' 
      ],
      title: this.tripInfo.title,
      dates: this.tripInfo.dates,
      description: this.tripInfo.description,
      completed: this.tripInfo.completed,
      isActive: this.tripInfo.isActive,
      isEditing: this.tripInfo.isEditing,
      id: this.tripInfo.id,
    }
  },
  methods: {
    submit() {
      if (this.$refs.editForm.validate())
      this.loading = true
      const trip = {
        title: this.title,
        dates: this.dates,
        description: this.description,
        completed: this.completed,
        isActive: this.isActive,
        isEditing: false,
        id: this.id
      }
      db.collection('trips').doc(trip.id).update({
        title: trip.title,
        dates: trip.dates,
        description: trip.description,
        completed: trip.completed,
        isActive: trip.isActive,
        isEditing: trip.isEditing
      }).then(() => {
        this.loading = false
      })
    }
  },
  computed: {
    dateRangeText() {
      return [this.dates[0].substr(5,5), this.dates[1]].join(' to ')
    }
  },

}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>