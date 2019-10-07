const express = require('express');
const router = express.Router();

const inboxesRouter = require('./inboxes');
const userRouter = require('./user');
router.use('/api', inboxesRouter);
router.use('/admin', userRouter);

module.exports = router;
