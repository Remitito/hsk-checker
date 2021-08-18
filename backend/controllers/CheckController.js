var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

const UserPage = require('../models/userPages');

exports.checkUrlPost = function(req,res) { 
    // Get the user's URL and format it for use with request module
    var userUrl = req.body.url;
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
    // Regex and function for extracting Chinese
    const REGEX_CHINESE = /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
    const hasChinese = (str) => REGEX_CHINESE.test(str);

    // Load URL and extract Chinese from the webpage
    var allChinese = request(formattedUrl, (error, response, html) => {
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
            // Save to a file for comparison with HSK word lists
            fs.writeFileSync('userUrlChinese.txt', userUrlChinese);
            res.send("Chinese Saved!")
        }
    })
}

exports.checkUrlGet = function(req,res) {
    var userUrlChinese = fs.readFileSync('userUrlChinese.txt', 'utf-8');
    var summaryParts = []; // Contains the report according to each HSK level
    var hskPercentages = []; // For passing info to the database

    // Check what % of the web page's words are found in each HSK level
    compareToHsk = (hskText, hskNumber) => {
        var knownChinese = "";
        for (let e = 0; e < userUrlChinese.length; e++) {
            if(hskText.includes(userUrlChinese[e])){
                knownChinese += userUrlChinese[e]}
        }
        var percentKnown = Math.round((knownChinese.length / userUrlChinese.length) * 100)
        var tempString = ("HSK" + hskNumber + " covers " + percentKnown + "% of characters on this web page");
        hskPercentages.push(percentKnown);
        summaryParts.push(tempString);
    }

    // Loop over the array of levels until all are compared
    const hskLevels = ['hsk1.txt', 'hsk2.txt', 'hsk3.txt', 'hsk4.txt', 'hsk5.txt', 'hsk6.txt'];
    for(let i = 0; i < hskLevels.length; i++) {
        var hsk = fs.readFileSync(hskLevels[i], 'utf-8');
        compareToHsk(hsk, i + 1)
    }
    var urlForDb = fs.readFileSync('userUrl.txt', 'utf-8');
    const newUserPage = new UserPage({
        title: urlForDb,
        url: urlForDb,
        hsk1: hskPercentages[0],
        hsk2: hskPercentages[1],
        hsk3: hskPercentages[2],
        hsk4: hskPercentages[3],
        hsk5: hskPercentages[4],
        hsk6: hskPercentages[5],
    })
    newUserPage.save().then(res.send(summaryParts)) // Save the results to database
    // Then send the array of reports for each level to map over in the frontend
}