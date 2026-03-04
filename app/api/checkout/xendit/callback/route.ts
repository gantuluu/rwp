import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Xendit Webhook Received:', body);

    // Verify Xendit Callback Token
    const xenditCallbackToken = req.headers.get('x-callback-token');
    const expectedToken = process.env.XENDIT_WEBHOOK_VERIFICATION_TOKEN;

    if (expectedToken && xenditCallbackToken !== expectedToken) {
      console.error('Invalid Xendit Callback Token');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, external_id, id } = body;

    if (status === 'PAID') {
      console.log(`Invoice ${id} for order ${external_id} has been PAID`);
      // Update order status in database here if applicable
    } else if (status === 'EXPIRED') {
      console.log(`Invoice ${id} for order ${external_id} has EXPIRED`);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Xendit Webhook Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
