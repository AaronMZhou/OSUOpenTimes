import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'node:fs';

export async function scrapeScott() {
  const executablePath = await resolveExecutablePath();
  if (!executablePath) {
    throw new Error('No Chrome executable found for Puppeteer');
  }

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath,
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://dining.osu.edu/hours/autumn-2025-semester', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    const getTextByXPath = async (xpath) => {
      const handle = await page.$(`::-p-xpath(${xpath})`);
      if (!handle) return null;
      const text = await handle.getProperty('textContent');
      return text.jsonValue();
    };

    const scott1RawText = await getTextByXPath('//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[102]');
    const scott2RawText = await getTextByXPath('//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[103]');
    const scott3RawText = await getTextByXPath('//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[104]');
    const scott4RawText = await getTextByXPath('//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[105]');

    const times = { scott1RawText, scott2RawText, scott3RawText, scott4RawText };
    console.log(times);
    return times;
  } finally {
    await browser.close();
  }
}

async function resolveExecutablePath() {
  if (process.env.CHROME_EXECUTABLE_PATH) return process.env.CHROME_EXECUTABLE_PATH;
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;

  const candidates = [
    'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
    'C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];

  const localChrome = candidates.find((p) => fs.existsSync(p));
  if (localChrome) return localChrome;

  const chromiumPath = await chromium.executablePath();
  if (chromiumPath && fs.existsSync(chromiumPath)) return chromiumPath;

  return null;
}
