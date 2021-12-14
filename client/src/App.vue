<template>
  <v-app>
    <v-app-bar app color="cyan darken-3" height="70" dense dark>
      <v-icon class="mr-5" large>mdi-account-cash</v-icon>
      <v-toolbar-title class="text-h5">Bankkonten Verwaltungssystem</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = !drawer" right></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" right>
      <v-list nav dense>
        <v-list-item-group active-class="cyan darken-3 white--text text--accent-2">
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-left">Kunden Übersicht</v-list-item-title>
          </v-list-item>

          <v-list-item to="/addKunde">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-left">Kunden einfügen</v-list-item-title>
          </v-list-item>
          <v-list-item to="/addKonto">
            <v-list-item-icon>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-left">Konto erstellen</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view :kunden="kunden" :konten="konten" @refreshKunden="getKunden" @konten="getKonten"/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data: () => {
    return {
      drawer: false,
      kunden: [],
      konten: [],
    };
  },
  methods: {
    async getKunden() {
      let { data } = await axios({
        url: 'http://localhost:3000/kunden',
        method: 'GET',
      });
      this.kunden = data;
    },
    async getKonten() {
      let { data } = await axios({
        url: 'http://localhost:3000/konten',
        method: 'GET',
      });
      this.konten = data;
    },
  },
  created() {
    this.getKunden();
    this.getKonten();
  },
};
</script>
