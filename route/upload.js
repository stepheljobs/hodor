'use strict';

var fs = require('fs');
var S3FS = require('s3fs');
var client = new S3FS('bucket-name/bucket-folder-optional', {
  accessKeyId: '{YOUR ACCESS KEY ID}',
  secretAccessKey: '{YOUR SECRET KEY ID}'
});

exports.goUpload = function(req, res) {
  // client.create();
  console.log('------> start uploading');
  var files = req.files.fileUpload;
  files.forEach(function (file, index) {
      console.log('##############');
      console.log(file);
      console.log(index);
      var stream = fs.createReadStream(file.path);
      return client.writeFile(file.originalFilename, stream).then( function(etag) {
         fs.unlink(file.path, function(err){
           if (err) throw err;
         });
        //  https://ipostmo-s3-staging.s3.amazonaws.com/products/testimage1.jpg
        //  res.send(file.originalFilename);
        console.log('---> value: ', etag); //
        console.log('uploaded success: ', index);
      });
  });
  console.log('------> end here');
};
