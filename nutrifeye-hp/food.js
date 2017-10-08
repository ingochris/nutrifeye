'use strict';

var api_key = '8jiQSHN2ltDgw7Ys6GX2qbpHiSKlxE2JYDIovTyO';


function findFood (name) {
    console.log('Looking for ' + name + '...');

    var encodedName = encodeURIComponent(name);
    var usda_url = 'https://api.nal.usda.gov/ndb/search/?format=json&q=' + encodedName + '&sort=n&max=5&offset=0&api_key=' + api_key;

    // var options = {
    //     url,
    //     method: 'GET'
    // };

    $.get({
        url: usda_url
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('Error searching for food: ' + textStatus + ' ' + errorThrown);
    }).done(function (err, res, body) {
        var output = JSON.parse(body);
        var id = output.list.item[0].ndbno;

        console.log('Found food id for' + name + ': ' + id);
        getNutrients(id);
    });
}


function getNutrients (id) {
    console.log('Looking for ' + id + '...');

    var usda_url = 'https://api.nal.usda.gov/ndb/nutrients/?format=json&api_key=' + api_key + '&nutrients=205&nutrients=204&nutrients=208&nutrients=269&nutrients=203&ndbno=' + id;

    $.get({
        url: usda_url
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('Error searching for food id: ' + textStatus + ' ' + errorThrown);
    }).done(function (err, res, body) {
        console.log(body);
    })

}
