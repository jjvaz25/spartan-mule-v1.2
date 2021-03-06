<template>
  <div class="popup">
    <v-dialog
      v-model="dialogOpen"
      max-width="500px"
    >
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Let the adventure begin!</v-card-title>
        <v-card-text>
          <v-form ref="addTripForm">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field 
                    v-model="title"
                    label="Trip name*"
                    prepend-icon="map"
                    :rules="inputRules"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateRangeText"
                        label="Trip dates*"
                        prepend-icon="event"
                        readonly
                        :rules="inputRules"
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
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="description"
                    label="Include some miscellaneous notes about your trip!"
                    outlined
                    auto-grow
                    solo
                    flat
                  >
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn 
            class="warning" 
            text 
            @click="dialogOpen=false"
          >
            Cancel
          </v-btn>
          <v-btn 
            @click="submit" 
            class="success" 
            text
            :loading="loading"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script>
import db from '../fb'

export default {
  name: 'AddTripForm',
  data() {
    return {
      dialogOpen: false,
      inputRules: [
        v=> (v && v.length >= 1) || 'Field is required' 
      ],
      menu: false,
      loading: false,
      title: '',
      dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
      description: '',
    }
  },
  computed: {
    dateRangeText() {
      return [this.dates[0].substr(5,5), this.dates[1]].join(' to ')
    }
  },
  methods: {
    submit() {
      if (this.$refs.addTripForm.validate()) {
        this.loading = true
        const newTrip = {
          title: this.title,
          dates: this.dates,
          description: this.description,
          completed: false,
          isEditing: false,
          isActive: false
        }
        db.collection('trips').add(newTrip).then(() => {
          this.loading = false
          this.dialogOpen = false
          this.title = ''
          this.dates = [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)]
          this.description = ''
          this.$emit('tripAdded')
          this.$refs.addTripForm.resetValidation()
        })
      }
    },
  }
}
</script>
