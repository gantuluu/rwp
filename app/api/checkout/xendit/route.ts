import { NextResponse } from 'next/server';
import { getBaseUrl } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, orderId, email, customerName, items } = body;

    const secretKey = (process.env.XENDIT_SECRET_KEY || '').trim();

    if (!secretKey) {
      console.error('XENDIT_SECRET_KEY is not defined in environment variables.');
      return NextResponse.json(
        { error: 'Xendit Secret Key is missing. Please set XENDIT_SECRET_KEY in environment variables.' },
        { status: 500 }
      );
    }

    // Log key info safely for debugging
    console.log(`Xendit Key Info: Length=${secretKey.length}, Prefix=${secretKey.substring(0, 8)}...`);

    // Ensure orderId is unique for testing to avoid conflicts
    const uniqueOrderId = `${orderId}-${Math.floor(Math.random() * 1000)}`;

    const baseUrl = getBaseUrl();
    console.log(`Using Base URL for redirects: ${baseUrl}`);

    const payload: any = {
      external_id: uniqueOrderId,
      amount: Math.round(amount),
      payer_email: email,
      description: `Pembayaran Produk RWPStore - Order ${orderId}`,
      currency: 'IDR',
      success_redirect_url: `${baseUrl}/checkout/success`,
      failure_redirect_url: `${baseUrl}/checkout?status=failed`,
    };

    console.log('Sending request to Xendit REST API:', JSON.stringify(payload, null, 2));

    // Base64 encode the secret key with a trailing colon for Basic Auth
    const authHeader = Buffer.from(`${secretKey}:`).toString('base64');

    const response = await fetch('https://api.xendit.co/v2/invoices', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authHeader}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type');
    let data: any;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      console.error('Xendit API returned non-JSON response:', text);
      return NextResponse.json(
        { error: 'Xendit API returned an unexpected response format', details: text },
        { status: response.status }
      );
    }

    if (!response.ok) {
      console.error('Xendit API Error Response:', JSON.stringify(data, null, 2));
      
      let errorMessage = data.message || data.error_code || 'Xendit API error';
      
      if (data.error_code === 'REQUEST_FORBIDDEN_ERROR') {
        errorMessage = 'Xendit REQUEST_FORBIDDEN_ERROR: Pastikan API Key (Secret Key) Anda memiliki izin "Write" untuk "Invoices" di Dashboard Xendit.';
      }

      return NextResponse.json(
        { 
          error: errorMessage,
          details: data 
        },
        { status: response.status }
      );
    }

    console.log('Xendit Invoice Created Successfully:', data.invoice_url);

    return NextResponse.json({
      invoiceUrl: data.invoice_url,
      externalId: data.external_id,
      id: data.id,
    });
  } catch (error: any) {
    console.error('Xendit Checkout API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
