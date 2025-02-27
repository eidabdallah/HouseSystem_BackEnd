import nodemailer from 'nodemailer';

export async function sendEmail(to, subject, html) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.AdminEmail,
            pass: process.env.PASSWORDSENDER,
        },
    });
    const info = await transporter.sendMail({
        from: `House System <${process.env.AdminEmail}>`,
        to,
        subject,
        html,
    });
}
