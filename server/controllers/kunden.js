const asyncHandler = require('express-async-handler');
const kundenFunctions = require('../model/kunden.js');
const kontoFunctions = require('../model/konten.js');

const getKunden = asyncHandler(async (req, res) => {
  res.status(200).json(await kundenFunctions.getKunden());
});

const getKunde = asyncHandler(async (req, res) => {
  const { kundennummer } = req.params;
  const rows = await kundenFunctions.getKunde(kundennummer);
  if (rows.length === 0) {
    res.status(404).send(`Kunde ${kundennummer} does not exist`);
  } else {
    res.status(200).json(await kundenFunctions.getKunde(req.params.kundennummer));
  }
});

const patchKunde = asyncHandler(async (req, res) => {
  const { kundennummer } = req.params;
  const rows = await kundenFunctions.getKunde(kundennummer);
  if (rows.length === 0) res.status(404).send(`Kunde ${kundennummer} does not exist.`);
  else {
    kundenFunctions.patchKunde(kundennummer, req.body);
    res.status(200).send(`Kunde ${kundennummer} updated.`);
  }
});

const deleteKunde = asyncHandler(async (req, res) => {
  const { kundennummer } = req.params;
  const rows = await kundenFunctions.getKunde(kundennummer);
  if (rows.length === 0) {
    res.status(404).send(`Kunde ${kundennummer} does not exist.`);
  } else {
    kundenFunctions.deleteKunde(kundennummer);
    res.status(200).send(`Kunde ${kundennummer} deleted.`);
  }
});

const addKunde = asyncHandler(async (req, res) => {
  const kundennummer = kundenFunctions.getRandomNumber(100000000, 999999999);
  const rows = await kundenFunctions.getKunde(kundennummer);
  if (rows.length > 0) {
    res.status(404).send(`Kunde ${kundennummer} already exists.`);
  } else {
    await kundenFunctions.addKunde(req.body, kundennummer);
    res.status(200).send(`Kunde ${kundennummer} added.`);
  }
});

const addKundeKonto = asyncHandler(async (req, res) => {
  const kundennummer = kundenFunctions.getRandomNumber(100000000, 999999999);
  const rows = await kundenFunctions.getKunde(kundennummer);
  if (rows.length > 0) {
    res.status(404).send(`Kunde ${kundennummer} already exists.`);
  } else {
    await kundenFunctions.addKunde(req.body, kundennummer);
    res.status(200).send(`Kunde ${kundennummer} added.`);
  }
  if (kundennummer !== '') {
    const kartennummer = kontoFunctions.getRandomNumber(100000000, 999999999);
    const kontenRows = await kontoFunctions.getKonto(kartennummer);
    console.log(kontenRows);
    if (kontenRows.length > 0) {
      res.status(404).send(`Konto ${kartennummer} already exists.`);
    } else {
      await kontoFunctions.addKonto(req.body, kartennummer, kundennummer);
      res.status(200).send(`Konto ${kartennummer} added.`);
    }
  }
  if (!kundennummer) {
    res.status(404).send('Kundennummer not defined.');
  }
});

module.exports = { getKunde, getKunden, deleteKunde, patchKunde, addKunde, addKundeKonto };
