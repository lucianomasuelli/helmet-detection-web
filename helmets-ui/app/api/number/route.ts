import { NextResponse } from 'next/server';

export async function GET() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';
  try {
    const response = await fetch(`${backendUrl}/number/`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener el número:', error);
    return NextResponse.json(
      { error: 'Error al obtener el número del backend' },
      { status: 500 }
    );
  }
} 