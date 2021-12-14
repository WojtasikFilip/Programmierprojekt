<template>
  <v-container class="mt-10">
    <v-card class="pa-4 grey lighten-2">
      <v-card-title>
        <span class="text-h5">Konto anlegen</span>
      </v-card-title>
      <form>
        <v-row class="justify-center">
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="selectKunde"
              :items="kunden.map((el) => el.kundennummer)"
              :hint="
                kunden.filter((el) => el.kundennummer == selectKunde)[0].vorname +
                ' ' +
                kunden.filter((el) => el.kundennummer == selectKunde)[0].nachname
              "
              label="Select Kunde"
              prepend-icon="mdi-account"
              required
              persistent-hint
            >
            </v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Kartennummer*"
              required
              disabled
              prepend-icon="mdi-credit-card-plus-outline"
              v-model="kartennummer"
              class="black--text"
            ></v-text-field>
            <v-btn
              class="float-right"
              outlined
              color="cyan darken-3"
              @click="getRandomNumber(1000000000, 9999999999)"
              >Kartennummer generieren</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Erstelldatum"
              prepend-icon="mdi-calendar-text"
              disabled
              v-model="konto_seit"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Kontostand"
              v-model="kontostand"
              placeholder="0€"
              prepend-icon="mdi-cash-multiple"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="IBAN"
              disabled
              v-model="iban"
              prepend-icon="mdi-card-account-details"
            ></v-text-field>
            <v-btn outlined color="cyan darken-3" @click="getRandomIBAN()">IBAN generieren</v-btn>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              color="blue darken-1"
              x-large
              text
              @click="insertKonto()"
              :disabled="iban.length == 0 || kontostand.length == 0"
            >
              Konto hinzufügen
            </v-btn>
          </div>
        </v-card-actions>
      </form>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    kunden: {
      type: Array,
    },
  },
  data() {
    return {
      selectKunde: this.kunden[0].kundennummer,
      kartennummer: '',
      kontostand: null,
      iban: '',
      konto_seit: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      items: [],
    };
  },

  methods: {
    async insertKonto() {
      console.log(this.selectKunde);
      await axios({
        url: 'http://127.0.0.1:3000/konten',
        method: 'POST',
        contentType: 'application/json',
        data: {
          kartennummer: this.kartennummer,
          iban: this.iban,
          kontostand: this.kontostand,
          konto_seit: this.konto_seit,
          fk_kundennummer: this.selectKunde,
        },
      });
      (this.kartennummer = ''), (this.iban = ''), (this.kontostand = 0);
      this.$emit('refreshKunden');
    },
    getRandomNumber(min, max) {
      this.kartennummer = Math.floor(Math.random() * (max - min) + min);
    },
    getRandomIBAN() {
      const max = Math.pow(10, 13);
      const min = Math.pow(9, 13);
      let randomIban = 'AT' + Math.floor(Math.pow(10, 13) + Math.random() * (max - min) + min);
      this.iban = randomIban;
    },
  },
};
</script>

<style lang="scss" scoped></style>
