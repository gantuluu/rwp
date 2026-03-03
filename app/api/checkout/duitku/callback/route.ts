import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Duitku sends callback as form-data or JSON depending on config
    // For sandbox, we just acknowledge it
    console.log('Duitku Callback Received');
    
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Callback Error:', error);
    return new Response('Error', { status: 500 });
  }
}
