'use strict';

var api_key = '8jiQSHN2ltDgw7Ys6GX2qbpHiSKlxE2JYDIovTyO';

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

$(function () {
    $('#fileform').on('submit', uploadFiles);
});

/**
 * 'submit' event handler - reads the image bytes and sends it to the Cloud
 * Vision API.
 */
function uploadFiles (event) {
    event.preventDefault(); // Prevent the default form post
    console.log('Uploading picture...');
    // Grab the file and asynchronously convert to base64.
    var file = $('#fileform [name=fileField]')[0].files[0];
    var reader = new FileReader();
    reader.onloadend = processFile;
    reader.readAsDataURL(file);
}

/**
 * Event handler for a file's data url - extract the image data and pass it off.
 */
function processFile (event) {
    console.log('Processing picture...');
    var content = event.target.result;
    sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

/**
 * Sends the given file contents to the Cloud Vision API and outputs the
 * results.
 */
function sendFileToCloudVision (content) {
    console.log("Sending to Google Cloud Vision...");
    var type = 'LABEL_DETECTION';

    // Strip out the file prefix when you convert to json.
    var request = {
        requests: [{
            image: {
                content: content
            },
            features: [{
                type: type,
                maxResults: 200
            }]
        }]
    };

    $('#results').text('Loading...');
    $.post({
        url: CV_URL,
        data: JSON.stringify(request),
        contentType: 'application/json'
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
    }).done(connect);
}

/**
 * Displays the results.
 */
function connect (data) {
    console.log('Connecting services');
    var name = data.responses[0].labelAnnotations[0].description;
    findFood(name);
}


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
        console.log(body);
        var id = body.responseJSON.list.item[0].ndbno;

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

        var cal = body.responseJSON.report.foods[0].nutrients[0].value;
        var sugar = body.responseJSON.report.foods[0].nutrients[1].value;
        var protein = body.responseJSON.report.foods[0].nutrients[2].value;
        var fat = body.responseJSON.report.foods[0].nutrients[3].value;
        var carbs = body.responseJSON.report.foods[0].nutrients[4].value;

        format({
            "cal": cal,
            "fat": fat,
            "carbs": carbs,
            "sugar": sugar,
            "protein": protein
        })

    });

}


function format (data) {
    var text= '' +
        'Calories       ' + data.cal + '   kcal\n' +
        '--------------------------------\n' +
        'Fat            ' + data.fat + '    g\n' +
        '--------------------------------\n' +
        'Carbs          ' + data.carbs + '   g\n' +
        '--------------------------------\n' +
        'Sugar          ' + data.sugar + '   g\n' +
        '--------------------------------\n' +
        'Protein        ' + data.protein + '    g';


    $('#results').text(text);
    var evt = new Event('results-displayed');
    evt.results = text;
    document.dispatchEvent(evt);





}

