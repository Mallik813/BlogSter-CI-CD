const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/dev');
const requireLogin = require('../middlewares/requireLogin');
const s3 = new AWS.S3({
  credentials: {
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
  },
  region: 'ap-south-1',
});

module.exports = app => {
  app.get('/api/upload', requireLogin, (req, res) => {

    const key = `${req.user.id}/${uuid()}.jpeg`;
    s3.getSignedUrl('putObject', {
      Bucket: 'mallik-blogster-bucket',
      ContentType: 'image/jpeg',
      Key: key
    }, (err, url) => {
      res.send({key, url})
    })
  });
}