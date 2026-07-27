import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // In a real application, you would send an email or save to a database here
        console.log('Received consultation request:', body);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        return NextResponse.json(
            { message: 'Consultation request received successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing consultation request:', error);
        return NextResponse.json(
            { error: 'Failed to process consultation request' },
            { status: 500 }
        );
    }
}
