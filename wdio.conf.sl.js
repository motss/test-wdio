const path = require('path');

const { config } = require('./wdio.conf.js');

const buildNumber = new Date().toJSON();
const defaultBrowserSauceOptions = {
    build: buildNumber,
    screenResolution: '1920x1080',
    seleniumVersion: '3.141.59',
};
const chromeOptions = {
    'goog:chromeOptions': {
        w3c: true,
    },
};

exports.config = {
    ...config,
    services: ['sauce'],
    region: 'us',
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    sauceConnect: true,
    sauceConnectOpts: {
        user: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
    },
    capabilities: [
        {
            browserName: 'googlechrome',
            platformName: 'windows 10',
            browserVersion: 'latest',
            'sauce:options': {
                ...defaultBrowserSauceOptions,
                logName: 'chrome-latest',
            },
            ...chromeOptions,
        },
        {
            browserName: 'firefox',
            platformName: 'windows 10',
            browserVersion: 'latest',
            'sauce:options': {
                ...defaultBrowserSauceOptions,
                logName: 'firefox-latest',
            },
        },
        {
            browserName: 'microsoftedge',
            platformName: 'windows 10',
            browserVersion: 'latest',
            'sauce:options': {
                ...defaultBrowserSauceOptions,
                logName: 'edge-latest',
            },
        },
        {
            browserName: 'safari',
            platformName: 'macos 10.13',
            browserVersion: 'latest',
            'sauce:options': {
                ...defaultBrowserSauceOptions,
                logName: 'safari-latest',
                screenResolution: '1600x1200',
            },
        },
    ],
};