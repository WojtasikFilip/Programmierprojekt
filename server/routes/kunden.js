const express = require('express');

const {
  getKunden,
  getKunde,
  patchKunde,
  deleteKunde,
  addKunde,
  getKundenKonten,
} = require('../controllers/kunden.js');

const router = express.Router();

router.get('/', getKunden);
router.get('/:kundennummer', getKunde);
router.get('/:kundennummer/konten', getKundenKonten);

router.patch('/:kundennummer', patchKunde);

router.delete('/:kundennummer', deleteKunde);

router.post('/', addKunde);

module.exports = router;
