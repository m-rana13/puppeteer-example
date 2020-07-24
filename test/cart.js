const puppeteer = require('puppeteer');
const { expect } = require('chai');
const { getPriceFromCart } = require('../pageObject/cartPage');
const { closeLoginPrompt } = require('../pageObject/loginPrompt');
const { performSearch, openSearchResult } = require('../pageObject/search');
const { addToCart } = require('../pageObject/itemDetail');

describe('Flipkart add to Cart functionality', async () => {
    let browser;
    let page;
    let currentPage;

    before(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    beforeEach(async () => {
        await page.goto('https://www.flipkart.com');
    });

    it('GIVEN I on the logged out home page \
        WHEN I search for a keyword \
        AND add first item in cart from search results \
        THEN cart should contain the correct item', async () => {
        // login prompt is shown to the first time visitor
        await closeLoginPrompt(page);

        await performSearch('shirt', page);
        await openSearchResult(1, page);

        // opening search result will open a new tab
        await page.waitFor(3000);
        const allPages = await browser.pages();
        currentPage = allPages[allPages.length - 1];

        const expectedPrice = await addToCart(currentPage);
        const actualPrice = await getPriceFromCart(currentPage);

        expect(actualPrice).to.equal(expectedPrice);
    });

    afterEach(async function() {
        const activePage = currentPage || page;
        if (this.currentTest.state === 'failed') {
            await activePage.screenshot({ path: `${this.currentTest.title}.jpg` })
        }
    });

    after(async () => {
        await browser.close();
    });
});