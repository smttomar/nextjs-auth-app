import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        //create a hased Token
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000,
            });
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000,
            });
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const mailOptions = {
            from: "sumitsnghtmr@gmail.com",
            to: email,
            subject:
                emailType === "VERIFY"
                    ? "Verify your email"
                    : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}">here</a> to ${
                emailType === "VERIFY"
                    ? "verify your email"
                    : "reset your password"
            }
            or copy and paste the link below in your browser. <br> ${
                process.env.DOMAIN
            }/${
                emailType === "VERIFY" ? "verifyemail" : "resetpassword"
            }?token=${hashedToken}
            </p>`,
        };

        const mailresponse = await transporter.sendMail(mailOptions);
        return mailresponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
