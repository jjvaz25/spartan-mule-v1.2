<template>
  <div class="popup">
    <v-dialog
      v-model="dialogOpen"
      max-width="500px"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" depressed v-on="on">
          Add Trip
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
                      <v-btn @click="menu=false">Cancel</v-btn>
                      <v-btn @click="$refs.menu.save(dates)">OK</v-btn>
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
          <v-btn class="error" text @click="dialogOpen=false">Cancel</v-btn>
          <v-btn class="success" text>Submit</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>


    <!-- <v-dialog
      v-model="dialogOpen"
      max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="primary" depressed v-on="on">
          Add to library
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h2>Add to your library</h2>
        </v-card-title>
        <v-card-text>
          <v-form px-3 ref="form"> 
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field 
                    v-model="title" 
                    label="title*" 
                    :rules="inputRules"
                    prepend-icon="folder"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field 
                    v-model="creator" 
                    label="creator*" 
                    :rules="inputRules"
                    prepend-icon="person"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                  v-model="category"
                  :items="['Book', 'Video Game', 'Other']"
                  label="category*"
                  :rules="inputRules"
                  prepend-icon="label"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="rating"
                    :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    label="rating"
                    prepend-icon="star"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-checkbox
                    v-model="completed"
                    label="Completed?"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="error" text @click="dialogOpen = false">Cancel</v-btn>
          <v-btn @click="submit" class="success" text :loading="loading">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

  </div>
</template>

<script>

export default {
  name: 'AddTripForm',
  data() {
    return {
      dialogOpen: true,
      inputRules: [
        v=> (v && v.length >= 1) || 'Field is required' 
      ],
      menu: false,
      title: '',
      dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
      description: ''
    }
  },
  computed: {
    dateRangeText() {
      return [this.dates[0].substr(5,5), this.dates[1]].join(' to ')
    }
  },
  methods: {
    // submit() {
    //   if (this.$refs.form.validate()) {
    //     this.loading = true;
    //     const item = {
    //       title: this.title,
    //       creator: this.creator,
    //       category: this.category,
    //       completed: this.completed,
    //       rating: this.rating,
    //       time: new Date()
    //     }
    //     db.collection('library').add(item).then(() => {
    //       this.loading = false
    //       this.dialogOpen = false
    //       this.$emit('itemAdded')
    //       this.$refs.form.reset()
    //     })
    //   }
    // },
  }
}
</script>