const { extractProductURLs, crawlWithPuppeteer } = require('../utils/crawler');

const productPatterns = ['/product', '/item', '/p'];

const crawlEcommerceSites = async (req, res) => {
    const { domains } = req.body;
    console.log("request recieved")

    if (!domains || !Array.isArray(domains)) {
        return res.status(400).json({ error: 'Invalid domains input' });
    }

    const results = {};
    for (const domain of domains) {
        const urls = await extractProductURLs(domain, productPatterns);
        const dynamicUrls = await crawlWithPuppeteer(domain, productPatterns);
        results[domain] = [...new Set([...urls, ...dynamicUrls])];
    }

    res.json(results);
};

module.exports = { crawlEcommerceSites };
