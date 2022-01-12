const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

module.exports = {
    formatUrl : function formatUrl(url) {
        if(url.includes('www.')) {
            return url.slice(url.indexOf('www.') + 4) // from after www.
        }
        else if (url.includes('://')) {
            return url.slice(url.indexOf('://') + 3) // from after the http:///https://
        }
        else {
            return url;
        }
    },
    extractChinese : function extractChinese(url) {
        // Regex and function for extracting Chinese
        const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
        const hasChinese = (str) => REGEX_CHINESE.test(str);
        let allChinese = request(url, (response, html) => {
            // Add stuff about status code
            let $ = cheerio.load(html);
            let userUrlChinese = "";
            let allText = $('body').text().toString();
            for(let i = 0; i < allText.length; i++) {
                if(hasChinese(allText[i])) {
                    userUrlChinese += allText[i]
                }
            }
            // Save to a file for comparison with HSK word lists
            fs.writeFileSync('userUrlChinese.txt', userUrlChinese);
            })
    },
    testUrl : function testUrl(url) {
        request(url, (error, response, html) => {
            if(!error) {
                if(response.statusCode == 200) {
                    return true;
                }
            }
            else {
                console.log(possibleUrls[i] + " failed")
                return false;
            }
        })
    }
}


