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
  console.log(req.params);
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
  const kartennummer = kundenFunctions.getRandomNumber(100000000, 999999999);

  const kundenRows = await kundenFunctions.getKunde(kundennummer);
  const kontenRows = await kontoFunctions.getKonto(kartennummer);

  if (kundenRows.length > 0 && kontenRows.length > 0) {
    res.status(404).send('Kunde or Konto already exists.');
  }
  if (kundennummer) {
    await kundenFunctions.addKunde(req.body, kundennummer);
    await kontoFunctions.addKonto(req.body, kartennummer, kundennummer);
    res.status(200).send(`Kunde ${kundennummer} and Konto ${kartennummer} were added.`);
  } else {
    res.status(404).send('Unable to add Kunde and Konto');
  }
});

module.exports = { getKunde, getKunden, deleteKunde, patchKunde, addKunde, addKundeKonto };
