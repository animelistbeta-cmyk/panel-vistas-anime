import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { ref, push, set } from 'firebase/database';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { animeId, episode, server, pageUrl } = body;

    if (!animeId || !episode) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400, headers: corsHeaders() });
    }

    const viewsRef = ref(db, 'vistas_reproductor');
    const newViewRef = push(viewsRef);

    await set(newViewRef, {
      animeId,
      episode,
      server: server || 'Desconocido',
      pageUrl: pageUrl || '',
      timestamp: Date.now(),
      fecha: new Date().toISOString()
    });

    return NextResponse.json({ success: true }, { headers: corsHeaders() });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders() });
  }
}