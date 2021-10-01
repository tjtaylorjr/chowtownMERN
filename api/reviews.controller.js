const ReviewsDAO = require('../dao/reviewsDAO.js');
const aws = require('aws-sdk');
const crypto = require('crypto');
const util = require('util');
const { json } = require('express');
const random = util.promisify(crypto.randomBytes);

class ReviewsController {
  static async apiGetS3Url(req, res, next) {
    try {
      const region = 'us-east-1';
      const bucketName = process.env.AWS_BUCKET_NAME;
      const accessKeyId = process.env.AWS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_KEY;


      const s3 = new aws.S3({
        region,
        accessKeyId,
        secretAccessKey,
        signatureVersion: 'v4'
      })

      const generateSecureUrl = async () => {
        const randomBytes = await random(16);
        const imageKey = randomBytes.toString('hex');

        const params = ({
          Bucket: bucketName,
          Key: imageKey,
          Expires: 60
        })

        const upload = await s3.getSignedUrlPromise('putObject', params);
        return upload;
      }

      const s3Url = await generateSecureUrl();
      res.send({s3Url});

    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }

  static async apiDeleteAWSImage(req, res, next) {
    try {
      const region = 'us-east-1';
      const bucketName = process.env.AWS_BUCKET_NAME;
      const accessKeyId = process.env.AWS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_KEY;
      const imageKey = req.params.imageKey


      const s3 = new aws.S3({
        region,
        accessKeyId,
        secretAccessKey,
        signatureVersion: 'v4'
      })

      const params = ({
        Bucket: bucketName,
        Key: imageKey
      })

      await s3.headObject(params).promise()

      try {
        await s3.deleteObject(params).promise()

      } catch (err) {
        res.status(500).json({ error: err.message })
      }

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const title = req.body.title;
      const text = req.body.text;
      const name = req.body.name;
      const user_id = req.body.user_id;
      const date = new Date();
      const imageName = req.body.imageName;
      const imageUrl = req.body.imageUrl;
      const rating = req.body.rating;

      const reviewResponse = await ReviewsDAO.addReview(
        restaurantId,
        name,
        user_id,
        title,
        text,
        imageName,
        imageUrl,
        rating,
        date
      );

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    };
  };

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const user_id = req.body.user_id;
      const title = req.body.title;
      const text = req.body.text;
      const date = new Date();
      const imageName = req.body.imageName;
      const imageUrl = req.body.imageUrl;
      const rating = req.body.rating;

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user_id,
        title,
        text,
        imageName,
        imageUrl,
        rating,
        date,
      );

      const { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error });
      };

      if (reviewResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update review - user may not be original poster",
        );
      };

      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    };
  };

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.query.id;
      const userId = req.body.user_id;
      const reviewResponse = await ReviewsDAO.deleteReview(
        reviewId,
        userId,
      );
      res.json({ status: "success" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    };
  };
};

module.exports = ReviewsController;
