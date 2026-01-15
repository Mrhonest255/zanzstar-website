import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('ref');

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Booking reference is required' },
        { status: 400 }
      );
    }

    // Get booking with tour and customer details
    const { data: booking, error } = await supabase
      .from('bookings')
      .select(`
        *,
        tours (
          title,
          slug,
          image_url,
          duration,
          location
        ),
        customers (
          first_name,
          last_name,
          email
        )
      `)
      .eq('reference', reference.toUpperCase())
      .single();

    if (error || !booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Map status to user-friendly format
    const statusInfo = {
      pending: {
        label: 'Pending Confirmation',
        description: 'Your booking is being reviewed by our team.',
        color: 'yellow',
        step: 1
      },
      confirmed: {
        label: 'Confirmed',
        description: 'Your booking has been confirmed! We look forward to seeing you.',
        color: 'green',
        step: 2
      },
      completed: {
        label: 'Completed',
        description: 'Thank you for traveling with us! We hope you had an amazing experience.',
        color: 'blue',
        step: 3
      },
      cancelled: {
        label: 'Cancelled',
        description: 'This booking has been cancelled.',
        color: 'red',
        step: 0
      }
    };

    return NextResponse.json({
      success: true,
      booking: {
        reference: booking.reference,
        status: booking.status,
        statusInfo: statusInfo[booking.status as keyof typeof statusInfo] || statusInfo.pending,
        date: booking.date,
        time: booking.time,
        guests: booking.guests,
        totalAmount: booking.total_amount,
        notes: booking.notes,
        createdAt: booking.created_at,
        tour: booking.tours,
        customer: {
          firstName: booking.customers?.first_name,
          lastName: booking.customers?.last_name,
          email: booking.customers?.email
        }
      }
    });

  } catch (error) {
    console.error('Track booking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}
