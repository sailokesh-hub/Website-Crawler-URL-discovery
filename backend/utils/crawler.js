const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const extractProductURLs = async (url, patterns) => {
    const productURLs = new Set();

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Match URLs based on patterns
        $('a').each((_, element) => {
            const link = $(element).attr('href');
            if (link && patterns.some(pattern => link.includes(pattern))) {
                productURLs.add(new URL(link, url).href);
            }
        });
    } catch (error) {
        console.error(`Error fetching URL: ${url}`, error.message);
    }
    return Array.from(productURLs);
};

const crawlWithPuppeteer = async (url) => {
    try {
        // Connect to Browserless
        const browser = await puppeteer.connect({
            browserWSEndpoint: 'wss://chrome.browserless.io/',
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' }); // Wait for the page to fully load

        // Perform scraping or URL extraction here
        const productUrls = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('a[href*="/product/"]'))
                .map((anchor) => anchor.href);
        });

        await browser.close(); // Always close the browser after use
        return productUrls;
    } catch (error) {
        console.error('Error during crawling:', error.message);
        return [];
    }
};

module.exports = { extractProductURLs, crawlWithPuppeteer };
