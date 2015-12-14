'use strict';

var fs = require('fs');
var S3FS = require('s3fs');
var client = new S3FS('bucket-name/bucket-folder-optional', {
  accessKeyId: '{YOUR ACCESS KEY ID}',
  secretAccessKey: '{YOUR SECRET KEY ID}'
});

exports.goUpload = function(req, res) {
  var files = req.files.fileUpload;
  var uploadedPhoto = [];

  files.forEach(function (file, index, array) {
      var stream = fs.createReadStream(file.path);
      return client.writeFile(file.originalFilename, stream).then( function(etag) {
        fs.unlink(file.path, function(err){
          if (err) throw err;
        });

        var cb = 'https://' + s3config.bucketName + '.s3.amazonaws.com/' + s3config.folder + '/' + file.originalFilename;
        uploadedPhoto.push(cb);
        if(uploadedPhoto.length === array.length){
          console.log(uploadedPhoto);
          res.send(uploadedPhoto);
        }

      });
  });
};
