const assert = require('assert');
const pretty = require('pretty');

const p = a => pretty(a.raw ? String.raw(a) : a, { ocd: true });
const getCleanHTML = async (a) => {
    const h = await a.getHTML();
    
    return p(
        h.replace(/<!---->/g, ''),
        { ocd: true }
    );
};
const el = async (cb) => {
    await browser.executeAsync(cb);

    return $('app-datepicker');
};

describe('1', () => {
    beforeEach(async () => {
        await browser.url(`http://localhost:3000/src/index.html`);
        
        await el(async (done) => {
            const a = document.createElement('app-datepicker');
            document.body.appendChild(a);

            done(a);
        });
    });

    afterEach(async () => {
        await el(async (done) => {
            document.body.removeChild(document.body.querySelector('app-datepicker'));
            done();
        });
    });

    it(`takes snapshot`, async () => {
        await browser.saveScreenshot(`./test/snapshots/1-0-${browser.capabilities.browserName}.snap.png`);
        await el(async (done) => {
            const a = document.querySelector('app-datepicker');

            a.min = '2020-01-01';
            a.value = '2020-02-02';
            await a.updateComplete;

            done();
        });
        await browser.saveScreenshot(`./test/snapshots/1-1-${browser.capabilities.browserName}.snap.png`);
    });

    it(`renders with correct 'min'`, async () => {
        const a = await el(async (done) => {
            const a = document.body.querySelector('app-datepicker');
    
            a.value = '2020-01-17';
            a.setAttribute('min', '2020-01-15');
            await a.updateComplete;

            done();
        });

        const disabledDates = await a.shadow$$('.day--disabled');
        const lastDisabledDates = disabledDates[disabledDates.length - 1];
        const lastDisabledDatesContent = await getCleanHTML(lastDisabledDates);

        const focusedDate = await a.shadow$('.day--focused');
        const focusedDateContent = await getCleanHTML(focusedDate);

        assert.strictEqual(
            lastDisabledDatesContent,
            p`
            <td class="full-calendar__day day--disabled" aria-label="Jan 14, 2020">
                <div class="calendar-day">14</div>
            </td>
            `
        );
        assert.strictEqual(
            focusedDateContent,
            p`
            <td class="full-calendar__day day--focused" aria-label="Jan 17, 2020">
                <div class="calendar-day">17</div>
            </td>
            `
        );
    });

});