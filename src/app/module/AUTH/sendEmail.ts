import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: config.email.address,
      pass: config.email.appPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"............" <ariyanrakib983@gmail.com>',
    to: email,
    subject: "Reset Password Link",
  });

  //console.log("Message sent: %s", info.messageId);
};

export default emailSender;
