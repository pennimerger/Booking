import nodemailer,{SentMessageInfo} from "nodemailer"
import { emailTemplate } from "../assets/emailTemplate";

interface MailProps {
  token: string;
  email: string;
}

const Mail = ({token, email}:MailProps) =>{
	const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.HOST_EMAIL as string,
			pass: process.env.HOST_PASSWORD as string
		},
		// logger:true,
		// debug: true,
	})

	const mailOptions = {
		from: process.env.HOST_EMAIL as string,
		to: email,
		subject: "Reset Password",
		html: emailTemplate(resetLink)
	}

	transporter.sendMail(mailOptions, (error: any|null, info: SentMessageInfo)=>{
		if (!error){
			return info.response
		}
		return error
	})
}

export default Mail