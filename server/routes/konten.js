const express = require('express');

const { getKonten, getKonto, patchKonto, deleteKonto } = require('../controllers/konten.js');

const { addKundeKonto } = require('../controllers/kunden');

const router = express.Router();

router.get('/', getKonten);
router.get('/:kartennummer', getKonto);

router.patch('/:kartennummer', patchKonto);

router.delete('/:kartennummer', deleteKonto);

router.post('/', addKundeKonto);

module.exports = router;
