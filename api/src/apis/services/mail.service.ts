import dotenv from 'dotenv'

import transporter from '@/servers/init.mailer'

dotenv.config()

const setMailSuccess = async (email: string) => {
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: 'Set mail receive notification successfully',
    html: 'You are success to set mail receive notification.',
  }

  await transporter.sendMail(mailOptions)
}

const taskNotification = async (email: string, title: string) => {
  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: 'Task notification',
    html: `You have a task with title: <strong>${title}</strong> due soon. <br>
    Please check it out <a href="${process.env.WEB_URL}/notification">here</a>.`,
  }

  await transporter.sendMail(mailOptions)
}

export default {
  setMailSuccess,
  taskNotification,
}
