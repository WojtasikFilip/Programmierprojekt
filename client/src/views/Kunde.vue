<template>
  <v-container>
    <h2 class="font-weight-medium">Kunde: {{ kunde.vorname }} {{ kunde.nachname }}</h2>
    <v-row justify="center">
      <v-expansion-panels>
        <v-expansion-panel v-for="k of kundenKonten" :key="k.kartennummer" class="ma-5">
          <v-expansion-panel-header>Konto: {{ k.kartennummer }}</v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>

            <v-subheader>Person</v-subheader>

            <v-row class="ml-5">
              <v-col cols="4"> Konto seit: {{ k.konto_seit.substring(0, 10) }} </v-col>
              <v-col cols="4"> Wohnort: {{ kunde.adresse }} </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-subheader>Konto Details</v-subheader>
            <v-row class="ml-5">
              <v-col cols="4">
                Kontostand: <b> {{ k.kontostand }} €</b>
              </v-col>
              <v-col cols="4"> IBAN: {{ k.iban }} </v-col>
            </v-row>
            <v-divider></v-divider>

            <v-subheader>Konto Transaktionen</v-subheader>
            <v-row class="text-center">
              <v-col cols="3">
                <v-dialog transition="dialog-bottom-transition" width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green darken-2 white--text" v-bind="attrs" v-on="on"
                      ><v-icon>mdi-cash-minus</v-icon></v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark class="text-h5">Geld abheben</v-toolbar>
                      <v-card-text class="text-center mt-5">
                        <v-row>
                          <v-col cols="6">
                            <v-btn class="mt-3" v-model="wert1" @click="summe += wert1">+10€</v-btn>
                            <br />
                            <v-btn class="mt-3" v-model="wert2" @click="summe += wert2">+20€</v-btn>
                            <br />
                            <v-btn class="mt-3" v-model="wert3" @click="summe += wert3">+50€</v-btn>
                            <br />
                            <v-btn class="mt-3" v-model="wert4" @click="summe += wert4">+100€</v-btn>
                            <br />
                            <v-btn class="mt-3" v-model="wert5" @click="summe += wert5">+500€</v-btn>
                          </v-col>

                          <v-col cols="6" class="float-right">
                            <v-btn
                              class="mt-3"
                              v-model="wert1"
                              @click="summe -= wert1"
                              :disabled="summe < wert1"
                              >-10€</v-btn
                            >
                            <br />
                            <v-btn
                              class="mt-3"
                              v-model="wert2"
                              @click="summe -= wert2"
                              :disabled="summe < wert2"
                              >-20€</v-btn
                            >
                            <br />
                            <v-btn
                              class="mt-3"
                              v-model="wert3"
                              @click="summe -= wert3"
                              :disabled="summe < wert3"
                              >-50€</v-btn
                            >
                            <br />
                            <v-btn
                              class="mt-3"
                              v-model="wert4"
                              @click="summe -= wert4"
                              :disabled="summe < wert4"
                              >-100€</v-btn
                            >
                            <br />
                            <v-btn
                              class="mt-3"
                              v-model="wert5"
                              @click="summe -= wert5"
                              :disabled="summe < wert5"
                              >-500€</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-card-text>

                      <h3 class="d-flex justify-center black--text">Summe: {{ summe }}€</h3>
                      <v-card-actions class="justify-end">
                        <v-btn
                          outlined
                          class="pa-3 mr-5"
                          color="teal"
                          :disabled="k.kontostand < summe"
                          @click="
                            geldAbheben(k);
                            dialog.value = false;
                            summe = 0;
                          "
                          >Bestätigen</v-btn
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                          outlined
                          color="red darken-2"
                          class="pa-3 mr-5"
                          @click="(dialog.value = false), (summe = 0)"
                          >Abbrechen</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
              <v-col cols="3">
                <v-dialog transition="dialog-bottom-transition" width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green darken-2 white--text" v-bind="attrs" v-on="on"
                      ><v-icon>mdi-cash-plus</v-icon></v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark class="text-h5">Geld einzahlen</v-toolbar>
                      <v-card-text class="text-center mt-5">
                        <v-text-field
                          hint="Betrag zum Einzahlen eingeben"
                          persistent-hint
                          prepend-icon="mdi-cash-multiple"
                          v-model="einzahlung"
                          type="number"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          outlined
                          class="pa-3 mr-5"
                          color="teal"
                          :disabled="einzahlung <= 0"
                          @click="geldEinzahlen(k), (dialog.value = false)"
                          >Bestätigen</v-btn
                        >
                        <v-spacer></v-spacer>
                        <v-btn
                          outlined
                          color="red darken-2"
                          class="pa-3 mr-5"
                          @click="(dialog.value = false), (einzahlung = 0)"
                          >Abbrechen</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>

              <v-col cols="3">
                <v-dialog transition="dialog-bottom-transition" width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="green darken-2 white--text" v-bind="attrs" v-on="on"
                      ><v-icon>mdi-bank-transfer</v-icon></v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark class="text-h5">Geld überweisen</v-toolbar>
                      <v-card-text>
                        <v-select
                          v-model="selectKonto"
                          :items="konten.map((el) => el.iban)"
                          label="Select Konto"
                          prepend-icon="mdi-account"
                          required
                        >
                        </v-select>
                        <v-text-field
                          hint="Betrag zum Überweisen eingeben"
                          persistent-hint
                          v-model="überweisung"
                          prepend-icon="mdi-cash-multiple"
                          type="number"
                        ></v-text-field>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          outlined
                          color="teal"
                          :disabled="überweisung <= 0 || Number(überweisung) > k.kontostand"
                          class="pa-3 mr-5"
                          @click="
                            geldÜberweisen(k);
                            dialog.value = false;
                          "
                          >Überweisen</v-btn
                        >
                        <v-spacer></v-spacer>

                        <v-btn
                          outlined
                          color="red darken-2"
                          @click="
                            dialog.value = false;
                            überweisung = 0;
                          "
                          >Abbrechen</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
              <v-col cols="3">
                <v-dialog transition="dialog-bottom-transition" width="600">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="amber darken-3 white--text" v-bind="attrs" v-on="on"
                      ><v-icon>mdi-history</v-icon></v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar color="primary" dark class="text-h5"
                        >Verlauf - letzte Transaktionen</v-toolbar
                      >
                      <div v-for="v of showHistory(k)" :key="v.datum + v.summe">
                        <v-card-text>
                          <p class="text-secondary">
                            {{ v.datum }}
                            <span class="font-weight-bold float-right">{{ v.summe }} € {{ v.message }}</span>
                          </p>
                        </v-card-text>
                      </div>
                      <v-card-actions class="justify-end">
                        <v-btn text @click="dialog.value = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      selectKonto: this.konten[0].iban,
      kunde: [],
      kundenKonten: [],
      verlauf: [],
      wert1: 10,
      wert2: 20,
      wert3: 50,
      wert4: 100,
      wert5: 500,
      summe: 0,
      einzahlung: 0,
      überweisung: 0,
    };
  },
  props: {
    kundennummer: {
      type: String,
    },
    konten: {
      type: Array,
    },
  },

  methods: {
    async geldÜberweisen(k) {
      const konto = this.konten.find((el) => el.iban == this.selectKonto);
      await axios({
        url: 'http://127.0.0.1:3000/konten/' + konto.kartennummer,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          kontostand: Number(konto.kontostand) + Number(this.überweisung),
        },
      });
      await axios({
        url: 'http://127.0.0.1:3000/konten/' + k.kartennummer,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          kontostand: Number(k.kontostand) - Number(this.überweisung),
        },
      });
      this.verlauf.push({
        datum: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        summe: Number(this.überweisung),
        kartennummer: k.kartennummer,
        message: `an ${konto.iban} überwiesen`,
      });
      localStorage.setItem('verlauf', JSON.stringify(this.verlauf));
      this.überweisung = 0;
      this.getKundeKonten();
    },
    async getKundeKonten() {
      let { data } = await axios({
        url: `http://127.0.0.1:3000/kunden/${this.kundennummer}/konten`,
        method: 'GET',
      });
      this.kundenKonten = data;
    },
    async getKunde() {
      let { data } = await axios({
        url: 'http://127.0.0.1:3000/kunden/' + this.kundennummer,
        method: 'GET',
      });
      this.kunde = data[0];
    },
    showHistory(i) {
      const verlauf = JSON.parse(localStorage.getItem('verlauf'));
      return verlauf.filter((el) => el.kartennummer == i.kartennummer);
    },
    async geldAbheben(k) {
      this.verlauf.push({
        datum: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        summe: this.summe,
        kartennummer: k.kartennummer,
        message: 'abgehoben',
      });
      localStorage.setItem('verlauf', JSON.stringify(this.verlauf));
      await axios({
        url: 'http://127.0.0.1:3000/konten/' + k.kartennummer,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          kontostand: Number(k.kontostand) - Number(this.summe),
        },
      });

      this.getKundeKonten();
    },
    async geldEinzahlen(k) {
      await axios({
        url: 'http://127.0.0.1:3000/konten/' + k.kartennummer,
        method: 'PATCH',
        contentType: 'application/json',
        data: {
          kontostand: Number(k.kontostand) + Number(this.einzahlung),
        },
      });
      this.verlauf.push({
        datum: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        summe: Number(this.einzahlung),
        kartennummer: k.kartennummer,
        message: 'eingezahlt',
      });
      localStorage.setItem('verlauf', JSON.stringify(this.verlauf));
      this.einzahlung = 0;
      this.getKundeKonten();
    },
  },
  created() {
    const localverlauf = JSON.parse(localStorage.getItem('verlauf'));

    if (localverlauf != null) {
      this.verlauf = localverlauf;
    }
    this.getKundeKonten();
    this.getKunde();
  },
};
</script>

<style lang="scss" scoped></style>
