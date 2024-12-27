const express = require('express');
const { crawlEcommerceSites } = require('../controllers/crawlerController');
const router = express.Router();

router.post('/crawl', crawlEcommerceSites);
router.get("/", (req, res) => {
    res.send({success: "true"})
})

module.exports = router;
