import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateBookingReference(): string {
  const prefix = 'ZS';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      tourName,
      tourSlug,
      firstName,
      lastName,
      email,
      phone,
      country,
      date,
      guests,
      message,
      totalAmount
    } = body;

    // Generate unique booking reference
    const bookingReference = generateBookingReference();

    // First, check if customer exists or create new one
    let customerId: string;
    
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingCustomer) {
      customerId = existingCustomer.id;
      // Update customer info
      await supabase
        .from('customers')
        .update({ 
          phone, 
          country,
          total_bookings: supabase.rpc('increment_bookings', { customer_email: email })
        })
        .eq('id', customerId);
    } else {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({
          email,
          first_name: firstName,
          last_name: lastName,
          phone,
          country,
          total_bookings: 1
        })
        .select('id')
        .single();

      if (customerError) throw customerError;
      customerId = newCustomer.id;
    }

    // Get tour ID
    const { data: tour } = await supabase
      .from('tours')
      .select('id, title, price')
      .eq('slug', tourSlug)
      .single();

    // Create booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        reference: bookingReference,
        tour_id: tour?.id,
        customer_id: customerId,
        date: date,
        time: '09:00',
        guests: parseInt(guests),
        total_amount: totalAmount || (tour?.price || 0) * parseInt(guests),
        status: 'pending',
        notes: message
      })
      .select()
      .single();

    if (bookingError) throw bookingError;

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'ZANZSTAR Tours <bookings@zanzstartours.com>',
      to: email,
      subject: `Booking Confirmation - ${bookingReference}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background: white; }
            .header { background: linear-gradient(135deg, #2d5a52 0%, #1a3a35 100%); padding: 40px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 28px; letter-spacing: 3px; }
            .header p { color: rgba(255,255,255,0.8); margin-top: 10px; }
            .content { padding: 40px; }
            .booking-ref { background: #f8f9fa; border-left: 4px solid #2d5a52; padding: 20px; margin: 20px 0; }
            .booking-ref h2 { color: #2d5a52; margin: 0; font-size: 24px; }
            .details { margin: 30px 0; }
            .details-row { display: flex; padding: 12px 0; border-bottom: 1px solid #eee; }
            .details-label { width: 140px; color: #666; font-weight: 500; }
            .details-value { color: #333; font-weight: 600; }
            .track-btn { display: inline-block; background: #2d5a52; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; }
            .whatsapp { display: inline-block; background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; margin-top: 15px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ZANZSTAR</h1>
              <p>Premium Tours & Safari</p>
            </div>
            <div class="content">
              <h2 style="color: #333;">Thank You for Your Booking!</h2>
              <p style="color: #666; line-height: 1.6;">Dear ${firstName},</p>
              <p style="color: #666; line-height: 1.6;">We're excited to confirm your booking request. Our team will review your reservation and contact you within 24 hours.</p>
              
              <div class="booking-ref">
                <p style="margin: 0 0 5px 0; color: #666; font-size: 12px; text-transform: uppercase;">Booking Reference</p>
                <h2>${bookingReference}</h2>
              </div>

              <div class="details">
                <h3 style="color: #2d5a52; margin-bottom: 15px;">Booking Details</h3>
                <div class="details-row">
                  <span class="details-label">Tour:</span>
                  <span class="details-value">${tourName}</span>
                </div>
                <div class="details-row">
                  <span class="details-label">Date:</span>
                  <span class="details-value">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="details-row">
                  <span class="details-label">Guests:</span>
                  <span class="details-value">${guests} ${parseInt(guests) > 1 ? 'people' : 'person'}</span>
                </div>
                <div class="details-row">
                  <span class="details-label">Total Amount:</span>
                  <span class="details-value">$${totalAmount || (tour?.price || 0) * parseInt(guests)}</span>
                </div>
              </div>

              <div style="text-align: center;">
                <a href="https://zanzstartours.com/track-booking?ref=${bookingReference}" class="track-btn">Track Your Booking</a>
              </div>

              <p style="color: #666; line-height: 1.6; margin-top: 30px;">Need help? Contact us on WhatsApp:</p>
              <a href="https://wa.me/255656443740" class="whatsapp">💬 WhatsApp Us</a>
            </div>
            <div class="footer">
              <p><strong>ZANZSTAR Tours</strong></p>
              <p>Stone Town, Zanzibar, Tanzania</p>
              <p>📞 +255 656 443 740</p>
              <p>✉️ info@zanzstartours.com</p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Send notification email to admin
    await resend.emails.send({
      from: 'ZANZSTAR Bookings <bookings@zanzstartours.com>',
      to: 'info@zanzstartours.com',
      subject: `🆕 New Booking: ${bookingReference} - ${tourName}`,
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
            .value { color: #333; font-size: 16px; font-weight: bold; }
            .urgent { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">🆕 New Booking Request</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">Reference: ${bookingReference}</p>
            </div>
            <div class="content">
              <div class="urgent">
                <strong>⚡ Action Required:</strong> Please confirm this booking within 24 hours.
              </div>
              
              <h3>Customer Information</h3>
              <div class="info-box">
                <div class="label">Name</div>
                <div class="value">${firstName} ${lastName}</div>
              </div>
              <div class="info-box">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>
              <div class="info-box">
                <div class="label">Phone</div>
                <div class="value">${phone}</div>
              </div>
              <div class="info-box">
                <div class="label">Country</div>
                <div class="value">${country}</div>
              </div>

              <h3>Booking Details</h3>
              <div class="info-box">
                <div class="label">Tour</div>
                <div class="value">${tourName}</div>
              </div>
              <div class="info-box">
                <div class="label">Date</div>
                <div class="value">${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div class="info-box">
                <div class="label">Guests</div>
                <div class="value">${guests}</div>
              </div>
              <div class="info-box">
                <div class="label">Total Amount</div>
                <div class="value">$${totalAmount || (tour?.price || 0) * parseInt(guests)}</div>
              </div>

              ${message ? `
              <h3>Special Requests</h3>
              <div class="info-box">
                <div class="value">${message}</div>
              </div>
              ` : ''}

              <p style="margin-top: 30px; text-align: center;">
                <a href="https://wa.me/${phone.replace(/\D/g, '')}" style="background: #25D366; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">Contact Customer on WhatsApp</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `
    });

    return NextResponse.json({
      success: true,
      bookingReference,
      message: 'Booking created successfully'
    });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
