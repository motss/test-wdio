const assert = require('assert');

describe('webdriver.io page', () => {
    const stripTemplate = a => a.replace(/<!---->/g, '');

    let el;

    beforeEach(async () => {
        await browser.url('http://localhost:3000/src/index.html');
        
        await browser.executeAsync((done) => {
            const tagName = 'test-el';
            const elo = document.createElement(tagName);

            document.body.appendChild(elo);

            done();
        });

        el = await $('test-el');
    });

    it('should have the right title', async () => {
        await browser.url('https://webdriver.io');

        const title = await browser.getTitle();
        assert.strictEqual(title, 'WebdriverIO · Next-gen WebDriver test framework for Node.js');
    });

    it('should have the right toast content', async () => {
        await browser.url('https://chromestatus.com');

        const toast = await $('chromedash-toast');
        const msg = await toast.shadow$('#msg');
        const msgContent = await msg.getHTML();

        assert.ok(
            [
                `<span id="msg" class="style-scope chromedash-toast">Welcome to chromestatus.com!</span>`,
                `<span id="msg">Welcome to chromestatus.com!</span>`,
            ].some(n => n === msgContent),
            `Wrong message in the toast`
        );
    });

    it(`should have the right content`, async () => {
        await browser.url('http://localhost:3000/src/index.html');

        const p = await $('body > p');
        const pContent = await p.getHTML();

        assert.strictEqual(pContent, '<p>This is just a test!</p>');
    });

    it(`should render <test-el>`, async () => {
        const h1 = await el.shadow$('h1');
        const h1Content = await h1.getHTML();

        assert.strictEqual(stripTemplate(h1Content), '<h1>Hello, World</h1>');
    });

    it(`should capture rendered content`, async () => {
        await browser.saveScreenshot(`./rendered-${browser.capabilities.browserName}.snap.png`);
    });
});