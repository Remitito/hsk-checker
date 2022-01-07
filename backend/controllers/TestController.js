var cheerio = require('cheerio');
var request = require('request');

exports.testFunc = function(url) {
    var userUrl = url;
    if(userUrl.includes("//") && userUrl.includes('www.')) {
        var urlAfterSlashes = "";
        for (let i = userUrl.indexOf("//") + 2; i < userUrl.length; i++) {
            urlAfterSlashes += userUrl[i];
        }
        var formattedUrl = "https://" + urlAfterSlashes;
    }
    else if (userUrl.includes("//") && !userUrl.includes('www.')) {
        var urlAfterSlashes = "";
        for (let i = userUrl.indexOf("//") + 2; i < userUrl.length; i++) {
            urlAfterSlashes += userUrl[i];
        }
        var formattedUrl = "https://www." + urlAfterSlashes;
    }
    else if (!userUrl.includes("//") && userUrl.includes('www.')) {
        var urlAfterSlashes = "";
        for (let i = userUrl.indexOf("//") + 1; i < userUrl.length; i++) {
            urlAfterSlashes += userUrl[i];
        }
        var formattedUrl = "https://" + urlAfterSlashes;
    }
    else {
        var formattedUrl = "https://www." + userUrl;
    }
    console.log(formattedUrl);

    var allChinese = request(formattedUrl, (error, response, html) => {
        if(!error && response.statusCode == 200) {
            console.log(response.statusCode)
            const $ = cheerio.load(html);
            const allText = $('body').text().toString();
            console.log(allText);      
        }
    })
}