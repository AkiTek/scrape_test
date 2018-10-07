const puppeteer = require('puppeteer');
const fetch = require('node-fetch')
const fs = require('fs')
// 飛んでくる前の情報が必要

const body = () =>  {"SECURE_FORM_TOKEN=&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3AtopPagingLinks%3ApageNumbers%3A4%3ApageNumberLink=x&hdnBulkReturnUrl=https%3A%2F%2Fb2b-ch.infomart.co.jp%2Fcompany%2Fsearch%2Flist.page&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A0%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=37110&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A1%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=17640239&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A2%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=17640193&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A3%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=37351&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A4%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=16591954&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A5%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=35425&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A6%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=35914&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A7%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=21139&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A8%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=12559992&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A9%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=35672&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A10%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=6651986&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A11%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=11719366&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A12%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=17638870&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A13%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=12053001&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A14%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=1245312&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A15%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=17638555&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A16%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=3201&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A17%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=11935814&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A18%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=35086&wmcExistsKeywordContainer%3AwmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A19%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=37713&leftColumnPanel%3AtfKeyWord=&leftColumnPanel%3AindustryPanel%3AwmcIndustry%3AhdnIndustryCdInfo=&leftColumnPanel%3AareaPanel%3AwmcArea%3AhdnAreaCdInfo=&leftColumnPanel%3AlistedMarketPanel%3AlistedMarketDataRow%3A0%3AhdnListedMarket=0&leftColumnPanel%3AlistedMarketPanel%3AlistedMarketDataRow%3A1%3AhdnListedMarket=1&leftColumnPanel%3AlistedMarketPanel%3AlistedMarketDataRow%3A2%3AhdnListedMarket=2&leftColumnPanel%3AlistedMarketPanel%3AlistedMarketDataRow%3A3%3AhdnListedMarket=3&leftColumnPanel%3AlistedMarketPanel%3AlistedMarketDataRow%3A4%3AhdnListedMarket=4&leftColumnPanel%3AlistedMarketPanel%3AlistedMarketDataRow%3A5%3AhdnListedMarket=5&leftColumnPanel%3AlistedMarketPanel%3AlistedMarketDataRow%3A6%3AhdnListedMarket=9"}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.setViewport({ width: 1080, height: 960 })  

    let i = 0

    const cookies_path = './send_cookies.json';
    let now_cookie  = ""
    let isExist = false;
    try {
      fs.statSync(cookies_path);
      isExist = true;
    } catch(err) {
      isExist = false;
    }
    let cookies = ""
    if (isExist) {
      cookies = JSON.parse(fs.readFileSync(cookies_path, 'utf-8'));
      let cookie_arr = []
      for (let cookie of cookies){
        cookie_arr.push(`${cookie["name"]}=${cookie["value"]};`)
      }
      now_cookie = cookie_arr.join(' ')
      console.log(now_cookie)
    }
    const cookies_path2 = './page_cookies.json';
    isExist = false;
    try {
      fs.statSync(cookies_path2);
      isExist = true;
    } catch(err) {
      isExist = false;
    }
    let control_page_id = ""
    let now_cookies =""
    if (isExist) {
      now_cookies = JSON.parse(fs.readFileSync(cookies_path2, 'utf-8'));
      for ( let arr of now_cookies){
        if (arr["name"] == "CONTROL_PAGE_ID"){
          control_page_id = arr["value"]
          break
        }
      }
      console.log(control_page_id)
    }

    const body_path = './body.json'
    isExist = false;
    try {
      fs.statSync(body_path);
      isExist = true;
    } catch(err) {
      isExist = false;
    }
    console.log(isExist)
    let body = ""
    if (isExist) {
      body = JSON.parse(fs.readFileSync(body_path, 'utf-8'));
      // console.log(body)
      // await page.setRequestInterception(true);

      // await page.on('request', request => {
      //   let overrides = {};
      //   overrides.method = 'GET';
      //   overrides.headers = {
      //     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      //     "Accept-Encoding": "gzip, deflate, br",
      //     "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
      //     "Connection": "keep-alive",
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     "Cookie": now_cookie,
      //     "Host": "b2b-ch.infomart.co.jp",
      //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
      //   };
      //   request.continue(overrides);
      // });
      await page.setCookie(...cookies)
    }
    await Promise.all([
      page.goto("https://b2b-ch.infomart.co.jp/company/search/top.page"+(control_page_id? `?${control_page_id}` : ""),{ waitUntil: 'networkidle2' }),
      page.waitForNavigation()
    ]);

    await page.setCookie(...now_cookies)

    while(i< 3){
      let corp_numbers = []
      for (let i=0;i<20;i++){
        corp_numbers.push(await page.$eval(`input[id=hdnCompanyLabelId${i}]`,el => el.value))
      }
      new_page = await browser.newPage();

      for (let number of corp_numbers){
        await Promise.all([
          new_page.goto("https://b2b-ch.infomart.co.jp/company/detail.page?5820&IMCOMPANY=" + number),
          new_page.waitForNavigation()
        ]);
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      await new_page.close();

      await page.evaluate(() => {
        const e = document.getElementById("form_hf_0");
        e.setAttribute('name', 'wmcExistsItemContainer:paging:topPagingLinks:pageNumbers:3:pageNumberLink');
        e.setAttribute('value', 'x');
        let f=document.getElementById('form');
        console.log('行くよー')
        f.submit()
      })
      i++

      await page.waitForNavigation()
      await new Promise(resolve => setTimeout(resolve, 3000))
    }
    let corp_numbers = []
    for (let i=0;i<20;i++){
      corp_numbers.push(await page.$eval(`input[id=hdnCompanyLabelId${i}]`,el => el.value))
    }
    // console.log(corp_numbers)
    const beforeCookies = await page.cookies();
    // console.log(afterCookies)
    fs.writeFileSync('send_cookies.json', JSON.stringify(beforeCookies));

    await page.evaluate(() => {
      const e = document.getElementById("form_hf_0");
      e.setAttribute('name', 'wmcExistsItemContainer:paging:topPagingLinks:pageNumbers:3:pageNumberLink');
      e.setAttribute('value', 'x');
      let f=document.getElementById('form');
      f.submit()
    })
    await page.waitForNavigation()
    const afterCookies = await page.cookies();
    // console.log(afterCookies)
    fs.writeFileSync('page_cookies.json', JSON.stringify(afterCookies));
    const afterbody = `SECURE_FORM_TOKEN=&wmcExistsItemContainer%3Apaging%3AtopPagingLinks%3ApageNumbers%3A3%3ApageNumberLink=x&hdnBulkReturnUrl=https%3A%2F%2Fb2b-ch.infomart.co.jp%2Fcompany%2Fsearch%2Ftop.page&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A0%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[0]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A1%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[1]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A2%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[2]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A3%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[3]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A4%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[4]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A5%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[5]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A6%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[6]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A7%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[7]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A8%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[8]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A9%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[9]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A10%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[10]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A11%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[11]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A12%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[12]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A13%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[13]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A14%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[14]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A15%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[15]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A16%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[16]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A17%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[17]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A18%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[18]}&wmcExistsItemContainer%3Apaging%3Apaging_body%3AsearchList%3A19%3AcompanyItemPanel%3AwmcChkBulkRegistration%3AhdnCompanyLabelId=${corp_numbers[19]}&leftColumnPanel%3AtfKeyWord=&leftColumnPanel%3AindustryPanel%3AwmcIndustry%3AhdnIndustryCdInfo=&leftColumnPanel%3AareaPanelShow more`
    fs.writeFileSync('body.json', JSON.stringify(afterbody));

    browser.close();
   }
)();
