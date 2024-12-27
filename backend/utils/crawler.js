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

const crawlWithPuppeteer = async (url, patterns) => {
    const productURLs = new Set();

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract dynamically loaded content
        const links = await page.evaluate(() =>
            Array.from(document.querySelectorAll('a')).map(a => a.href)
        );

        links.forEach(link => {
            if (patterns.some(pattern => link.includes(pattern))) {
                productURLs.add(link);
            }
        });
    } catch (error) {
        console.error(`Error loading page with Puppeteer: ${url}`, error.message);
    } finally {
        await browser.close();
    }
    return Array.from(productURLs);
};

module.exports = { extractProductURLs, crawlWithPuppeteer };
