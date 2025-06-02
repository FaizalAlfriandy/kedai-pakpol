"use server"

import nodemailer from "nodemailer"

type EmailData = {
  name: string
  email: string
  message: string
}

export async function sendEmail(data: EmailData) {
  // Untuk pengembangan, kita bisa menggunakan Ethereal untuk testing
  // Dalam produksi, gunakan SMTP provider seperti Gmail, SendGrid, dll.
  const testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  })

  // Siapkan email
  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: "info@kedaipakpol.com", // Ganti dengan email penerima yang sebenarnya
    replyTo: data.email,
    subject: `Pesan dari Website - ${data.name}`,
    text: data.message,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #815a47;">Pesan Baru dari Website</h2>
        <p><strong>Nama:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Pesan:</strong></p>
        <div style="background-color: #f9f7f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
          ${data.message.replace(/\n/g, "<br>")}
        </div>
      </div>
    `,
  }

  // Kirim email
  const info = await transporter.sendMail(mailOptions)

  // Untuk pengembangan, kita bisa melihat URL preview email
  console.log("Message sent: %s", info.messageId)
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

  return { success: true, messageId: info.messageId, previewUrl: nodemailer.getTestMessageUrl(info) }
}
