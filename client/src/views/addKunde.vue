<template>
  <v-container class="mt-10">
    <v-card class="pa-4 grey lighten-2">
      <v-card-title>
        <span class="text-h5">Kunden Profil</span>
      </v-card-title>
      <form>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="vorname"
              :error-messages="vornameErrors"
              label="Vorname"
              required
              prepend-icon="mdi-account"
              @input="$v.vorname.$touch()"
              @blur="$v.vorname.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="nachname"
              :error-messages="nachnameErrors"
              label="Nachname"
              prepend-icon="mdi-account"
              required
              @input="$v.nachname.$touch()"
              @blur="$v.nachname.$touch()"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="adresse"
              :error-messages="adresseErrors"
              label="Adresse"
              required
              prepend-icon="mdi-home"
              @input="$v.adresse.$touch()"
              @blur="$v.adresse.$touch()"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Geburtsdatum"
                  hint="DD/MM/YYYY format"
                  readonly
                  prepend-icon="mdi-calendar-text"
                  persistent-hint
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="dateMenu = false"></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="6">
            <v-text-field
              label="Kundennummer*"
              required
              disabled
              prepend-icon="mdi-card-account-details"
              v-model="kundennummer"
              class="black--text"
            ></v-text-field>
            <v-btn
              class="text-center"
              outlined
              color="cyan darken-3"
              @click="getRandomNumber(100000000, 999999999)"
              >Kundennummer generieren</v-btn
            >
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            x-large
            text
            @click="insertKunde()"
            :disabled="vorname.length == 0 || nachname.length == 0 || adresse.length == 0 || date.length == 0"
          >
            Kunde hinzufügen
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin],

  validations: {
    vorname: { required },
    nachname: { required },
    adresse: { required },
  },
  data(vm) {
    return {
      // picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      date: null,
      dateFormatted: vm.formatDate(vm.date),
      dateMenu: false,
      vorname: '',
      nachname: '',
      adresse: '',
      kundennummer: '',
    };
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    async insertKunde() {
      await axios({
        url: 'http://127.0.0.1:3000/kunden',
        method: 'POST',
        contentType: 'application/json',
        data: {
          kundennummer: this.kundennummer,
          geburtsdatum: this.date,
          adresse: this.adresse,
          vorname: this.vorname,
          nachname: this.nachname,
        },
      });
      (this.vorname = ''),
        (this.nachname = ''),
        (this.adresse = ''),
        (this.kundennummer = ''),
        (this.date = '');
    },
    getRandomNumber(min, max) {
      this.kundennummer = Math.floor(Math.random() * (max - min) + min);
      console.log(this.kundennummer);
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    },
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
    vornameErrors() {
      const errors = [];
      if (!this.$v.vorname.$dirty) return errors;
      !this.$v.vorname.required && errors.push('Vorname is required.');
      return errors;
    },
    nachnameErrors() {
      const errors = [];
      if (!this.$v.nachname.$dirty) return errors;
      !this.$v.nachname.required && errors.push('Nachname is required.');
      return errors;
    },
    adresseErrors() {
      const errors = [];
      if (!this.$v.adresse.$dirty) return errors;
      !this.$v.adresse.required && errors.push('Adresse is required.');
      return errors;
    },
  },
};
</script>

<style lang="scss" scoped></style>
