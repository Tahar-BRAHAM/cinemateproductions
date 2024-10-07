const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Validate form input
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // 1. Send an email to your company (Cinemate Productions)
    const companyEmail = {
        to: 'info@cinemate-productions.com', // Replace with your recipient email
        from: 'noreply@cinemate-productions.com', // Replace with your verified sender email
        subject: `New Contact Form Submission from ${name}`,
        text: `New user "${name}", email: ${email}, sent the following message: ${message}`,
        html: `<p>New user "<strong>${name}</strong>", email: <a href="mailto:${email}">${email}</a>, sent the following message:</p><p>${message}</p>`,
    };

    // 2. Auto-reply email to the user
    const autoReplyEmail = {
        to: email, // Send auto-reply to the user's email
        from: 'noreply@cinemate-productions.com', // Your verified sender
        subject: 'Vielen Dank für Ihre Nachricht!',
        text: `Sehr geehrte/r ${name},\nvielen Dank für Ihre Nachricht. Wir bestätigen hiermit den Eingang Ihrer E-Mail.\nWir werden Ihre Anfrage so schnell wie möglich bearbeiten.\nMit freundlichen Grüßen,\nCinemate Productions`,
        html: `
            <p>Sehr geehrte/r ${name},</p>
            <p>vielen Dank für Ihre Nachricht. Wir bestätigen hiermit den Eingang Ihrer E-Mail vom ${new Date().toLocaleDateString()}.</p>
            <p>Wir werden Ihre Anfrage so schnell wie möglich bearbeiten und melden uns bei Ihnen, sobald es Neuigkeiten gibt.</p>
            <p>Sollten Sie in der Zwischenzeit Fragen haben, zögern Sie bitte nicht, uns zu kontaktieren.</p>
            <p>Mit freundlichen Grüßen,</p>
            <p><strong>Cinemate Productions</strong></p>
            <p><a href="mailto:info@cinemate-productions.com">info@cinemate-productions.com</a></p>
        `,
    };

    try {
        // Send both emails
        await Promise.all([
            sgMail.send(companyEmail),
            sgMail.send(autoReplyEmail),
        ]);

        // If successful, respond with a success message
        return res.status(200).json({ success: true, message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        return res.status(500).json({ success: false, message: 'Error sending emails' });
    }
});

module.exports = router;
