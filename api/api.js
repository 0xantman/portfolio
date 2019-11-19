const express = require('express');
const router = express.Router();
const inboxesRouter = require('./inboxes');
const userRouter = require('./user');
//const installRouter = require('./install');

router.use('/api', inboxesRouter);
router.use('/admin', userRouter);
//router.use('/install', installRouter);

module.exports = router;
