const express = require('express');

const { getKonten, getKonto, patchKonten, deleteKonto, addKonto } = require('../controllers/konten.js');

const router = express.Router();

router.get('/', getKonten);
router.get('/:kartennummer', getKonto);

router.patch('/:kartennummer', patchKonten);

router.delete('/:kartennummer', deleteKonto);

router.post('/', addKonto);

module.exports = router;
