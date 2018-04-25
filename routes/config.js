const express = require('express');
const router = express.Router();

const index = require('./index');
const songs = require('./songs');

router.route('/').get(index);
router.route('/songs').get(songs);

module.exports = router;
