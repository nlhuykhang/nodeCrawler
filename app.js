var Crawler = require('crawler');
var url = require('url');
var links = [];
var count = 0;
var fs = require('fs');
var cheerio = require('cheerio');


var c = new Crawler({
    maxConnections: 10,
    jQuery: true,
    // This will be called for each crawled page
    callback: function(error, result, $) {
        var pText = '';
        $('.article-content #abody div').each(function(i, p) {
            pText += $(this).text();
            // console.log(pText);
        });

        if (pText.length > 0) {
            fs.appendFile('thanhnien', pText, function() {
                $('a').each(function(index, a) {
                    var toQueueUrl = $(a).attr('href');

                    if (typeof toQueueUrl === 'string') {
                        var temp = url.parse(toQueueUrl);

                        if (temp.host === null) {
                            temp.host = 'http://www.thanhnien.com.vn';

                            if (links.indexOf(temp.host + temp.href) < 0) {
                                links.push(temp.host + temp.href);

                                console.log(++count);
                                // console.log(temp.host + temp.href);


                                c.queue(temp.host + temp.href);

                            }
                        } else {
                            if (temp.host === 'www.thanhnien.com.vn') {
                                if (links.indexOf(toQueueUrl) < 0) {
                                    links.push(toQueueUrl);

                                    console.log(++count);

                                    // console.log(toQueueUrl);

                                    c.queue(toQueueUrl);
                                }

                            }
                        }
                    }
                });
            });
        } else {
            $('a').each(function(index, a) {
                var toQueueUrl = $(a).attr('href');

                if (typeof toQueueUrl === 'string') {
                    var temp = url.parse(toQueueUrl);

                    if (temp.host === null) {
                        temp.host = 'http://www.thanhnien.com.vn';

                        if (links.indexOf(temp.host + temp.href) < 0) {
                            links.push(temp.host + temp.href);

                            console.log(++count);
                            // console.log(temp.host + temp.href);


                            c.queue(temp.host + temp.href);

                        }
                    } else {
                        if (temp.host === 'www.thanhnien.com.vn') {
                            if (links.indexOf(toQueueUrl) < 0) {
                                links.push(toQueueUrl);

                                console.log(++count);

                                // console.log(toQueueUrl);

                                c.queue(toQueueUrl);
                            }

                        }

                    }
                }
            });
        }
    }
});

// Queue just one URL, with default callback
c.queue('http://www.thanhnien.com.vn/chinh-tri-xa-hoi/truong-sa-sau-ngay-tiep-quan-ky-2-nuoc-la-mau-555198.html');

// // Queue a list of URLs
// c.queue(['http://jamendo.com/','http://tedxparis.com']);

// // Queue URLs with custom callbacks & parameters
// c.queue([{
//     uri: 'http://parishackers.org/',
//     jQuery: false,

//     // The global callback won't be called
//     callback: function (error, result) {
//         console.log('Grabbed', result.body.length, 'bytes');
//     }
// }]);

// // Queue using a function
// var googleSearch = function(search) {
//   return 'http://www.google.fr/search?q=' + search;
// };
// c.queue({
//   uri: googleSearch('cheese')
// });

// // Queue some HTML code directly without grabbing (mostly for tests)
// c.queue([{
//     html: '<p>This is a <strong>test</strong></p>'
// }]);