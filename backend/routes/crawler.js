const express = require('express');
const { crawlEcommerceSites } = require('../controllers/crawlerController');
const router = express.Router();

router.post('/crawl', crawlEcommerceSites);

module.exports = router;
