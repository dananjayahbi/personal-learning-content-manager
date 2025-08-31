import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
let messages: Array<{
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
}> = [];

export async function GET() {
  return NextResponse.json({ messages });
}

export async function POST(request: NextRequest) {
  try {
    const { text, senderId } = await request.json();
    
    if (!text?.trim()) {
      return NextResponse.json({ error: 'Message text is required' }, { status: 400 });
    }

    const message = {
      id: Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      senderId: senderId || 'anonymous',
      timestamp: new Date().toISOString(),
    };

    messages.push(message);

    // Keep only last 100 messages
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }

    // Echo back the message with "Echo:" prefix
    const echoMessage = {
      id: Math.random().toString(36).substr(2, 9),
      text: `Echo: ${message.text}`,
      senderId: 'system',
      timestamp: new Date().toISOString(),
    };

    messages.push(echoMessage);

    return NextResponse.json({ 
      message,
      echo: echoMessage,
      allMessages: messages 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
