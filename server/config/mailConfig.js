const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')
const aws = require('aws-sdk')
dotenv.config()

const smtpTransport =
  process.env.NODE_ENV === 'production'
    ? nodeMailer.createTransport({
        SES: new aws.SES({
          apiVersion: '2012-10-17',
          accessKeyId: process.env.DEPLOY_ACCESS_KEY_ID,
          secretAccessKey: process.env.DEPLOY_SERECT_ACCESS_KEY,
          region: process.env.DEPLOY_REGION
        })
      })
    : nodeMailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD
        },
        tls: {
          rejectUnauthorized: false
        }
      })

module.exports = smtpTransport
