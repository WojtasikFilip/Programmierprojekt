const asyncHandler = require('express-async-handler');
const kontoFunctions = require('../model/konten.js');

const getKonten = asyncHandler(async (req, res) => {
  res.status(200).json(await kontoFunctions.getKonten());
});

const getKonto = asyncHandler(async (req, res) => {
  const { kartennummer } = req.params;
  const rows = await kontoFunctions.getKonto(kartennummer);
  if (rows.length === 0) {
    res.status(404).send(`Konto ${kartennummer} does not exist.`);
  } else {
    res.status(200).json(await kontoFunctions.getKonto(req.params.kartennummer));
  }
});

const patchKonto = asyncHandler(async (req, res) => {
  const { kartennummer } = req.params;
  const rows = await kontoFunctions.getKonto(kartennummer);
  if (rows.length === 0) res.status(404).send(`Konto ${kartennummer} does not exist.`);
  else {
    kontoFunctions.patchKonten(kartennummer, req.body);
    res.status(200).send(`Konto ${kartennummer} updated.`);
  }
});

const deleteKonto = asyncHandler(async (req, res) => {
  const { kartennummer } = req.params;
  const rows = await kontoFunctions.getKonto(kartennummer);
  if (rows.length === 0) {
    res.status(404).send(`Konto ${kartennummer} does not exist.`);
  } else {
    kontoFunctions.deleteKonto(kartennummer);
    res.status(200).send(`Konto ${kartennummer} deleted.`);
  }
});

// const addKonto = asyncHandler(async (req, res) => {
//   const kartennummer = kontoFunctions.getRandomNumber(100000000, 999999999);
//   const kundennummer = kundenController.addKunde;
//   console.log(kundennummer);
//   const rows = await kontoFunctions.getKonto(kartennummer);
//   if (rows.length > 0) {
//     res.status(404).send(`Konto ${kartennummer} already exists.`);
//   } else {
//     await kontoFunctions.addKonto(req.body, kartennummer, kundennummer);
//     res.status(200).send(`Konto ${kartennummer} added.`);
//   }
// });

module.exports = {
  getKonten,
  getKonto,
  patchKonto,
  deleteKonto,
};
