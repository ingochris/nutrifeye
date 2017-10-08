var request = require('request');
let api_key = '8jiQSHN2ltDgw7Ys6GX2qbpHiSKlxE2JYDIovTyO';

module.exports.getNutrients = (id) => {
    console.log(`Looking up nutrietn info for ${id}...`);
    var url = `https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=${api_key}&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=203&ndbno=${id}`

    var options = {  
        url,
        method: 'GET'
    };

    

    request(options, function(err, res, body) {
        output = JSON.parse(body);
        console.log(output.report.foods[0].nutrients);

        var cal = output.report.foods[0].nutrients[0].value;
        var sugar = output.report.foods[0].nutrients[1].value; 
        var protein = output.report.foods[0].nutrients[2].value;
        var fat = output.report.foods[0].nutrients[3].value;
        var carbs = output.report.foods[0].nutrients[4].value;

        console.log(cal);
        console.log(sugar);
        console.log(protein);
        console.log(fat);
        console.log(carbs);
    });
}