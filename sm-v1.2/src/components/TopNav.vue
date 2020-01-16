<template>
  <v-app-bar
    app
    flat
    clipped-left
    color="primary"
    dark
  >
    <v-app-bar-nav-icon large />
    <span class="headline ml-3 font-weight-regular">Spartan<span class="font-weight-medium">Mule</span></span>
    <v-spacer></v-spacer>
    <div>
      <v-menu
        offset-y
        origin="top center"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text>
            <v-icon>person</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-icon small left>person</v-icon>
            <v-list-item-title>My Account</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-icon small left>exit_to_app</v-icon>
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </div>
  </v-app-bar>

</template>

<script>
export default {
  name: 'TopNav',
  data() {
    return {

    }
  },
};
</script>
