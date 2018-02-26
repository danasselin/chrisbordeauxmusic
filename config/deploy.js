const s3 = require('s3');
const Promise = require('bluebird');
const webpack = Promise.promisify(require('webpack'));
const PATHS = require('./util');
const config = require('./webpack.config.js')('production');
require('dotenv').config();

const deployError = function (err) {
  console.error('Deployment failed with the following error: ', err);
};

const deployEnd = function () {
  console.log('Deployment successful');
};

webpack(config)
  .then(function (result) {
    process.stdout.write(
      `${
        result.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        })}\n\n`);
  })
  .then(function () {
    const client = s3.createClient({
      s3Options: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_KEY,
      },
    });
    const params = {
      localDir: PATHS.build,
      s3Params: {
        ACL: 'public-read',
        Bucket: 'chrisbordeauxmusic.com',
      },
    };
    const uploader = client.uploadDir(params);
    uploader.on('error', deployError);
    uploader.on('end', deployEnd);
  });

