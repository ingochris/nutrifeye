var request = require('request');
var api_key = '8jiQSHN2ltDgw7Ys6GX2qbpHiSKlxE2JYDIovTyO';

var nutrients = require('./nutrients');

module.exports.findFood = (name) => {
    console.log(`Looking for ${name}...`);

    encodedName = encodeURIComponent(name);
    var url = `https://api.nal.usda.gov/ndb/search/?format=json&q=${encodedName}&sort=n&max=5&offset=0&api_key=${api_key}`

    var options = {  
        url,
        method: 'GET'
    };

    request(options, function(err, res, body) {
        output = JSON.parse(body);
        var id = output.list.item[0].ndbno;
        nutrients.getNutrients(id);
    });
};