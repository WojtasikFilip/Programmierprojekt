const express = require('express');

const { getKonten, getKonto, patchKonto, deleteKonto, addKonto } = require('../controllers/konten.js');

const { addKundeKonto } = require('../controllers/kunden');

const router = express.Router();

router.get('/', getKonten);
router.get('/:kartennummer', getKonto);

router.patch('/:kartennummer', patchKonto);

router.delete('/:kartennummer', deleteKonto);

router.post('/', addKonto);
router.post('/kundeKonto', addKundeKonto);

module.exports = router;
