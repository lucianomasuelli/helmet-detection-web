import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendUrl = process.env.BACKEND_URL || 'http://172.17.0.1:8000';
    
    return NextResponse.json({
      backendUrl,
      status: 'success'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la configuración' },
      { status: 500 }
    );
  }
} 