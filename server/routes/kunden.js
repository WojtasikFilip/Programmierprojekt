const express = require('express');

const { getKunden, getKunde, patchKunde, deleteKunde, addKunde } = require('../controllers/kunden.js');

const router = express.Router();

router.get('/', getKunden);
router.get('/:kundennummer', getKunde);

router.patch('/:kundennummer', patchKunde);

router.delete('/:kundennummer', deleteKunde);

router.post('/', addKunde);

module.exports = router;
