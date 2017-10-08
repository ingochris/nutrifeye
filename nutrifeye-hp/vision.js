
/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START vision_quickstart]
// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Instantiates a client
const vision = Vision();

// The name of the image file to annotate
const fileName = './assets/download.jpeg';

// Prepare the request object
const request = {
  source: {
    filename: fileName
  }
};

// Performs label detection on the image file
vision.labelDetection(request)
  .then((results) => {
    const labels = results[0].labelAnnotations;

    console.log('Labels:');
    labels.forEach((label) => console.log(label.description));
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });

// var fs = require('fs');

// const Vision = require('@google-cloud/vision');
// const vision = Vision();

// const api_key = 'AIzaSyDjPqZeT5RIsu8fNSRpczbL4gfq7ZCZt2I';

// module.exports.getImageDetails = (imagePath) =>  {
  
//   var imageFile = fs.readFileSync(imagePath);
//   var encoded = new Buffer(imageFile).toString('base64');
  
//   console.log(encoded);
  

//   var request = {
//     "responses": [
//       {
//         "image": {
//           "content": encoded
//         },
//         "features": [],
//       }
//     ]
//   }

//   console.log(typeof request.responses[0].image);
//   console.log(request.responses[0].image);

//   vision.annotateImage({request}).then(function(responses) {
//     var response = responses[0];
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.error(err);
//   });
// };




// // const request = require('request');
// // const api_key = 'AIzaSyDjPqZeT5RIsu8fNSRpczbL4gfq7ZCZt2I';

// // const fileName = 'assets/download.jpeg';

// // const options = {
// //   url: `https://vision.googleapis.com/v1/images:annotate?key=${api_key}`,
// //   method: 'POST',
// //   headers: {
// //     'Accept': 'appplication/json',
// //     'Content-Type': 'application/json'
// //   }, 
// // }

// // request(options, function(err, res, body) {
// //   var output = JSON.stringify(body); 
// //   console.log(output);
// // });
// // // const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${api_key}`, {
// // //   method: 'POST',
// // //   headers: {
// // //     'Accept': 'application/json',
// // //     'Content-Type': 'application/json',
// // //   },
// // //   body: JSON.stringify(body),
// // // });