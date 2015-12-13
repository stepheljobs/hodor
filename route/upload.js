'use strict';

var fs = require('fs');
var S3FS = require('s3fs');
var client = new S3FS('bucket-name/bucket-folder-optional', {
  accessKeyId: '{YOUR ACCESS KEY ID}',
  secretAccessKey: '{YOUR SECRET KEY ID}'
});

exports.goUpload = function(req, res) {
  // client.create();
  var file = req.files.fileUpload;
  var stream = fs.createReadStream(file.path);
  return client.writeFile(file.originalFilename, stream).then( function() {
     fs.unlink(file.path, function(err){
       if (err) throw err;
     });
     res.send(file.originalFilename);
  });
};
