var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
const got = require('got');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

// fs.readFileSync will block code beneath until it's finished reading

exports.checkUrlPost = function(req,res) {
    // Get user's URL from request 
    var userUrl = req.body.url;
    // Format the URL so it works in the app
    if(userUrl.includes("//")) {
        var urlAfterSlashes = "";
        for (let i = userUrl.indexOf("//") + 2; i < userUrl.length; i++) {
            urlAfterSlashes += userUrl[i];
        }
        var formattedUrl = "https://" + urlAfterSlashes;
    }
    else {
        var formattedUrl = "https://" + userUrl;
    }
    fs.writeFileSync('userUrl.txt', formattedUrl);
    res.send("Success");
}
exports.checkUrlGet = function(req,res) {
    var theUrl = fs.readFileSync('userUrl.txt', 'utf-8');
    // Regex and function for extracting Chinese
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    const hasChinese = (str) => REGEX_CHINESE.test(str);
    // Load URL and extract Chinese from the webpage
    var allChinese = request(theUrl, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            console.log(response.statusCode)
            const $ = cheerio.load(html);
            var userUrlChinese = "";
            const allText = $('body').text().toString();
            for(let i = 0; i < allText.length; i++) {
                if(hasChinese(allText[i])) {
                    userUrlChinese += allText[i]
                }
            }
            fs.writeFileSync('userUrlChinese.txt', userUrlChinese);
            res.send("Chinese Saved!")
        }
    })
}