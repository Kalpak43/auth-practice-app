import nodemailer from "nodemailer";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

export const sendMail = async ({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: string;
  userId: any;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            verifyToken: hashedToken,
            verifyTokenExpiry: Date.now() + 3600000,
          },
        }
      );
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
          },
        }
      );
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "a990596810e43f",
        pass: "07cb854dccf1b7",
      },
    });

    const mailOptions = {
      from: "kalpakgoshikwar123@gmail.com",
      to: email,
      subject: `${emailType} Email`,
      html: `
        <h1>${emailType} Email</h1>
        <p>Click on the link below to ${emailType.toLowerCase()} your email</p>
        <a href="${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}">Click here</a>
        <p> or copy and paste the link below in your browser</p>
        <br/>
        <p>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>
        `,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {}
};
