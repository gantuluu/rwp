import { NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';
import { getBaseUrl } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, orderId, productDetails, email, customerName, items, paymentMethod } = body;

    const merchantCode = process.env.NEXT_PUBLIC_DUITKU_MERCHANT_CODE;
    const apiKey = process.env.DUITKU_API_KEY;

    if (!merchantCode || !apiKey) {
      return NextResponse.json(
        { error: 'Duitku credentials not configured' },
        { status: 500 }
      );
    }

    const baseUrl = getBaseUrl();

    // Signature: MD5(merchantCode + merchantOrderId + paymentAmount + apiKey)
    const signature = CryptoJS.MD5(merchantCode + orderId + amount.toString() + apiKey).toString();

    const payload = {
      merchantCode,
      paymentAmount: Math.round(amount),
      merchantOrderId: orderId,
      productDetails,
      email,
      customerDetail: {
        firstName: customerName,
        email: email,
      },
      itemDetails: items.map((item: any) => ({
        name: item.title.substring(0, 50), // Duitku has length limits
        price: Math.round(item.price),
        quantity: item.quantity,
      })),
      paymentMethod: paymentMethod || '', // Empty string shows all available methods
      callbackUrl: `${baseUrl}/api/checkout/duitku/callback`,
      returnUrl: `${baseUrl}/checkout/success`,
      signature,
    };

    console.log('Sending payload to Duitku:', JSON.stringify(payload, null, 2));

    const isProduction = process.env.NEXT_PUBLIC_DUITKU_ENV === 'production';
    const duitkuUrl = isProduction
      ? 'https://passport.duitku.com/webapi/api/merchant/v2/inquiry'
      : 'https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry';

    console.log('Using Duitku URL:', duitkuUrl);

    const response = await fetch(duitkuUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log('Duitku Raw Response:', data);

    if (data.reference) {
      return NextResponse.json(data);
    } else {
      console.error('Duitku Error:', data);
      return NextResponse.json(
        { error: data.Message || data.message || 'Failed to create Duitku transaction' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
