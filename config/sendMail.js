const nodemailer = require("nodemailer");
const config = require("config");

exports.sendMail = async ({ to, subject, html }) => {
  try {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: config.get("mailHost"),
      port: config.get("mailPort"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.get("mailUser"), // generated ethereal user
        pass: config.get("mailPassword") // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    let info = await transporter.sendMail({
      from: config.get("mailFrom"), // sender address
      to, // list of receivers
      subject, // Subject line
      //   text: "Hello Anis?", // plain text body
      html // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
