const { remote } = require('webdriverio');

async function main() {
  const browser = await remote({
    logLevel: 'trace',
    capabilities: {
      browserName: 'chrome',
    },
  });

  await browser.url('https://duckduckgo.com')

  const inputElem = await browser.$('#search_form_input_homepage')
  await inputElem.setValue('WebdriverIO')

  const submitBtn = await browser.$('#search_button_homepage')
  await submitBtn.click()

  console.log(await browser.getTitle()) // outputs: "Title is: WebdriverIO (Software) at DuckDuckGo"

  await browser.deleteSession();
}

main().catch(console.error);