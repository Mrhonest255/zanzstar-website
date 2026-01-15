import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, type } = body;

    // Send email to admin
    await resend.emails.send({
      from: 'ZANZSTAR Website <contact@zanzstartours.com>',
      to: 'info@zanzstartours.com',
      subject: `${type === 'inquiry' ? '📩 New Inquiry' : '💬 Contact Form'}: ${subject || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; }
            .header { background: #2d5a52; padding: 20px; color: white; }
            .content { padding: 30px; }
            .info-box { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; }
            .label { color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
            .value { color: #333; font-size: 16px; }
            .message-box { background: #fff; border-left: 4px solid #2d5a52; padding: 20px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">📩 New ${type === 'inquiry' ? 'Inquiry' : 'Contact Message'}</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div class="content">
              <h3>Contact Information</h3>
              <div class="info-box">
                <div class="label">Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="info-box">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              ${phone ? `
              <div class="info-box">
                <div class="label">Phone</div>
                <div class="value"><a href="tel:${phone}">${phone}</a></div>
              </div>
              ` : ''}
              ${subject ? `
              <div class="info-box">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              ` : ''}

              <h3>Message</h3>
              <div class="message-box">
                <p style="margin: 0; white-space: pre-wrap;">${message}</p>
              </div>

              <p style="margin-top: 30px; text-align: center;">
                <a href="mailto:${email}" style="background: #2d5a52; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">Reply via Email</a>
                ${phone ? `<a href="https://wa.me/${phone.replace(/\D/g, '')}" style="background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">WhatsApp</a>` : ''}
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Send auto-reply to customer
    await resend.emails.send({
      from: 'ZANZSTAR Tours <noreply@zanzstartours.com>',
      to: email,
      subject: 'Thank you for contacting ZANZSTAR Tours',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #2d5a52 0%, #1a3a35 100%); padding: 40px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; letter-spacing: 3px; }
            .content { padding: 40px; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; }
            .whatsapp { display: inline-block; background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ZANZSTAR</h1>
              <p style="color: rgba(255,255,255,0.8); margin-top: 10px;">Premium Tours & Safari</p>
            </div>
            <div class="content">
              <h2 style="color: #333;">Thank You for Reaching Out!</h2>
              <p style="color: #666; line-height: 1.6;">Dear ${name},</p>
              <p style="color: #666; line-height: 1.6;">We have received your message and our team will get back to you within 24 hours.</p>
              <p style="color: #666; line-height: 1.6;">For immediate assistance, feel free to contact us on WhatsApp:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://wa.me/255656443740" class="whatsapp">💬 Chat on WhatsApp</a>
              </div>

              <p style="color: #666; line-height: 1.6;">We look forward to helping you explore the magic of Zanzibar!</p>
              <p style="color: #666; line-height: 1.6;">Best regards,<br><strong>ZANZSTAR Team</strong></p>
            </div>
            <div class="footer">
              <p><strong>ZANZSTAR Tours</strong></p>
              <p>Stone Town, Zanzibar, Tanzania</p>
              <p>📞 +255 656 443 740 | ✉️ info@zanzstartours.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return NextResponse.json({ success: true, message: 'Message sent successfully' });

  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
