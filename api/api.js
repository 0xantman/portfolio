const express = require('express');
const router = express.Router();

const inboxesRouter = require('./inboxes');

router.use('/api', inboxesRouter);

module.exports = router;
