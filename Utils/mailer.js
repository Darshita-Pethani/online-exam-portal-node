
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const moment = require('moment');
const { LEAVE_STATUS } = require("../config/constant");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

const mailOptions = {
  from: process.env.MAIL_EMAIL, // sender address
  to: '', // list of receivers
  subject: 'Welcome to Admin Pannel', // Subject line
  text: '', // plain text body
};

class Mailer {
  async forgotPasswordEmail(data) {

    mailOptions.to = data?.email;
    mailOptions.subject = "Reset Your Password.";
    if (data?.otp) {
      delete mailOptions.text;
      mailOptions.html = `<p> Hello Sir , Your Reset Password Link is "<a href='${data?.forgot_link}/auth/reset_password/'>${data?.forgot_link}/auth/reset_password</a>"</p> <p> Your One Time Password is </p> <h2> ${data?.otp} </h2> <P> This OTP is valid for next 2 minutes. </p> <p> Do not share OTP for security reason. </p>`;
    }
    else {
      delete mailOptions.html;
      mailOptions.text = `Hello Sir , Your Reset Password Link is ${data?.forgot_link}/${data?.token}`;
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info?.response);
      }
    });
  }


  async reviewRequestMail(data) {
    let customer_name = `${data?.customer_first_name}-${data?.customer_last_name}`;
    let customer_slug = customer_name.toLowerCase()
    mailOptions.to = data?.email;
    mailOptions.subject = `${data?.customer_first_name} ${data?.customer_last_name} from ${process.env.APP_NAME} - Your Feedback Matters! Share Your Experience with Us`;

    mailOptions.html = `<p> Dear ${data?.reviewerData?.first_name.charAt(0).toUpperCase()}${data?.reviewerData?.first_name.slice(1).toLowerCase()} ${data?.reviewerData?.last_name.charAt(0).toUpperCase()}${data?.reviewerData?.last_name.slice(1).toLowerCase()},</p> <p> We hope this message finds you well. At <b>${process.env.APP_NAME}</b>, we are committed to providing the best possible service to our valued customers. Your feedback is invaluable to us, as it helps us understand what we are doing well and where we can improve.</p> <p>Please click on the following link to leave your review: <a href='${data?.frontend_link}/listing/${customer_slug}'>${data?.frontend_link}/listing/${customer_slug}</a> </p> <p>Best regards,</p><p>${data?.customer_first_name} ${data?.customer_last_name}</p>`;
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info?.response);
      }
    });
  }

  async sendUserEmailAndPassword(data) {
    mailOptions.to = data?.email;
    mailOptions.subject = "Your Email and Password";
    if (data) {
      delete mailOptions.text;
      mailOptions.html = `<p> Hi, Your Email and Password is </p> <p> Email: <strong>${data?.email}</strong> </p> <p> Password: <strong>${data?.password}</strong> </p>`;

    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info?.response);
      }
    });
  }

}


module.exports = Mailer;

