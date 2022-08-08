const path = require('path');
const express = require('express');
const generalHandlers = require('../controllers/generalHandlers');

const router = express.Router();

router.use(generalHandlers.err404);

module.exports = router;