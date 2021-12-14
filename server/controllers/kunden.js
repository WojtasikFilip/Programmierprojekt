const asyncHandler = require('express-async-handler');
const kundenFunctions = require('../model/kunden.js');

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

const getKundenKonten = asyncHandler(async (req, res) => {
  const { kundennummer } = req.params;
  const rows = await kundenFunctions.getKunde(kundennummer);
  if (rows.length === 0) {
    res.status(404).send(`Kunde ${kundennummer} does not exist.`);
  } else {
    res.status(200).json(await kundenFunctions.getKundenKonten(req.params.kundennummer));
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
  const { kundennummer } = req.body;
  const rows = await kundenFunctions.getKunde(kundennummer);
  if (rows.length > 0) {
    res.status(404).send(`Kunde ${kundennummer} already exists.`);
  } else {
    await kundenFunctions.addKunde(req.body, kundennummer);
    res.status(200).send(`Kunde ${kundennummer} added.`);
  }
});

// eslint-disable-next-line max-len
module.exports = { getKunde, getKunden, getKundenKonten, deleteKunde, patchKunde, addKunde };
