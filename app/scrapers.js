const puppeteer = require('puppeteer');
async function scrapeScott() {
    url = 'https://dining.osu.edu/hours/autumn-2025-semester';
    //launch puppeteer, open dining page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    //pick out xpath for scott monday-thursday
    const scott1 = await page.$('::-p-xpath(//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[102])');
    const scott1Txt = await scott1.getProperty('textContent');
    const scott1RawText = await scott1Txt.jsonValue();
    
    //pick out xpath for scott friday
    const scott2 = await page.$('::-p-xpath(//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[103])');
    const scott2Txt = await scott2.getProperty('textContent');
    const scott2RawText = await scott2Txt.jsonValue();
    
    //pick out xpath for scott saturday
    const scott3 = await page.$('::-p-xpath(//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[104])');
    const scott3Txt = await scott3.getProperty('textContent');
    const scott3RawText = await scott3Txt.jsonValue();

    //pick out xpath for sunday 
    const scott4 = await page.$('::-p-xpath(//*[@id="ctl00_ctl00_MainContent_ContentBody_RightContent"]/div/div/p[105])');
    const scott4Txt = await scott4.getProperty('textContent');
    const scott4RawText = await scott4Txt.jsonValue();

    times = {scott1RawText, scott2RawText, scott3RawText, scott4RawText};
    console.log(times);
    browser.close();
    return times;

    
}
module.exports = { scrapeScott };