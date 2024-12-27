const express = require('express');
const { crawlEcommerceSites } = require('../controllers/crawlerController');
const router = express.Router();

router.post('/crawl', crawlEcommerceSites);

router.get("/", function(req, res) {
    res.send("true");
  });

module.exports = router;
