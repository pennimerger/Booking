import nodemailer,{SentMessageInfo} from "nodemailer"
import React from 'react'
// import ReactDOMServer from 'react-dom/server'
import {renderToString} from 'react-dom/server'
// import Mailer from "../../../fBooking/src/components/Mailer"
const Mailer = await import("../../../fBooking/src/components/Mailer")

// const html: JSX.Element = <Mailer resetLink={resetLink} />
const renderMailerTemplate = (resetLink: string): string => {
  return <Mailer resetLink={resetLink} />
}

const Mail = (token:string, email:string) =>{
	const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`
	const html = renderToString(renderMailerTemplate(resetLink))
  // const template = ReactDOMServer.renderToString(<Mailer resetLink={resetLink} />)
  const template = ""

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.HOST_EMAIL as string,
			pass: process.env.HOST_PASSWORD as string
		}
	})

	const mailOptions = {
		from: process.env.HOST_EMAIL as string,
		to: email,
		subject: "Reset Password",
		html: template
	}

	transporter.sendMail(mailOptions, (error: any|null, info: SentMessageInfo) =>{
		if (error){
			return error
		}
		return info.response
	})
}

export default Mail