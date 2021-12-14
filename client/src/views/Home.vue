<template>
  <v-container>
    <v-simple-table class="justify-center ma-10">
      <template v-slot:default>
        <thead>
          <tr class="text-center">
            <th class="text-center font-weight-bold black--text" style="font-size: 18px">Vorname</th>
            <th class="text-center font-weight-bold black--text" style="font-size: 18px">Nachname</th>
            <th class="text-center font-weight-bold black--text" style="font-size: 18px">Adresse</th>
            <th class="text-center font-weight-bold black--text" style="font-size: 18px">Kundennummer</th>
            <th class="text-center font-weight-bold black--text" style="font-size: 18px">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="k in kunden" :key="k.kundennummer" class="text-center">
            <td>{{ k.vorname }}</td>
            <td>{{ k.nachname }}</td>
            <td>{{ k.adresse }}</td>
            <td>{{ k.kundennummer }}</td>
            <td>
              <v-btn
                color="blue-grey darken-2"
                text
                :to="`/kunden/${k.kundennummer}/konten`"
                :disabled="!konten.find((element) => k.kundennummer == element.fk_kundennummer)"
              >
                <v-icon>mdi-account-box-multiple</v-icon>
              </v-btn>
              <v-btn color="red darken-2" text @click="delKunde(k.kundennummer)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<style lang="scss" scoped></style>

<script>
import axios from 'axios';
export default {
  props: {
    kunden: {
      type: Array,
    },
    konten: {
      type: Array,
    },
  },
  methods: {
    async delKunde(kundennummer) {
      await axios({
        url: 'http://127.0.0.1:3000/kunden/' + kundennummer,
        method: 'DELETE',
      });
      this.$emit('refreshKunden');
    },
  },
  mounted() {
    this.$emit('refreshKunden');
  },
  computed: {},
};
</script>
