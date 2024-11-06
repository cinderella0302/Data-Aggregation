import axios from 'axios';

const url = 'https://findadentist.ada.org/api/Dentists?Address=24614&Photo=false&OpenSaturday=false'

axios.get(url, {
    headers: {
        'accept': 'application/json, text/plain, */*',
        'accept-encoding': 'gzip, deflate, br, zstd',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': '_gcl_au=1.1.1678066696.1730070687; _ga=GA1.1.1861096961.1730070688; OptanonAlertBoxClosed=2024-10-27T23:11:54.362Z; OptanonConsent=isGpcEnabled=0&datestamp=Tue+Oct+29+2024+12%3A15%3A11+GMT-0700+(Pacific+Daylight+Time)&version=202402.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=C0002%3A1%2CC0003%3A1%2CC0001%3A1&geolocation=%3B&AwaitingReconsent=false; BE_CLA3=p_id%3DR424ALALAAPLR8J4PRLNL4R2RAAAAAAAAH%26bf%3D0f79baac507e3a8cd506134487f2c006%26bn%3D1%26bv%3D3.46%26s_expire%3D1730666320675%26s_id%3DR424ALALAAPLR2R4PR8NL4R2RAAAAAAAAH; _ga_NVSBFQCBYE=GS1.1.1730579920.5.1.1730579927.0.0.0; _ga_C2503WHWW7=GS1.1.1730579919.5.1.1730580061.0.0.0',
        'priority': 'u=1, i',
        'referer': 'https://findadentist.ada.org/search-results?address=98672&searchResultsReferrer=true',
        'sec-ch-ua': "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': "Windows",
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
            }
})
.then((response) => {
    console.log('Response: ', response.data);
    // console.log('Response:', response.data.Dentists);
    // response.data.Dentists.map((profile) => {
    //     console.log(profile);
    // })
})
.catch((error) => {
    console.error('Error:', error.response.statusText);
});
