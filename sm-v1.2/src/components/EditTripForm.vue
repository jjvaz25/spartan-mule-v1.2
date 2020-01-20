<template>
  <v-card>
    <v-form class="mx-3" ref="form">
      <v-text-field 
        label="Trip name*" 
        v-model="title"
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
        <v-btn text small class="success">Save</v-btn>
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

export default {
  name: 'EditTripForm',
  props: [
    'tripInfo'
  ],
  data() {
    return {
      menu: false,
      dialogOpen: false,
      inputRules: [
        v=> (v && v.length >= 1) || 'Field is required' 
      ],
      title: this.tripInfo.title,
      dates: this.tripInfo.dates,
      id: this.tripInfo.id,
    }
  },
  computed: {
    dateRangeText() {
      return [this.dates[0].substr(5,5), this.dates[1]].join(' to ')
    }
  },

  // description: this.tripInfo.description,
  // completed: this.tripInfo.completed,
  // isEditing: this.tripInfo.isEditing,
  // isActive: this.tripInfo.isActive

}
</script>

<style scoped>
.v-card__text, .v-card__title {
  word-break: normal; /* maybe !important  */
}
</style>