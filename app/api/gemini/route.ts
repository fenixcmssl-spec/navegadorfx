import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode = 'chat', contextUrl = '' } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt es requerido' },
        { status: 400 }
      );
    }

    let systemInstruction = `Eres Fenixy AI, el asistente ultraveloz integrado en el navegador Fenixy. Fenixy es un navegador ligero optimizado para ordenadores con pocos recursos.
Sé conciso, directo, extremadamente rápido y útil. Responde en español (o en el idioma de la consulta).
Si el usuario pregunta sobre optimización, páginas web, YouTube, cuentas o búsquedas, dale soluciones directas sin rodeos.`;

    if (mode === 'summarize') {
      systemInstruction += ` Tu tarea es resumir la información de manera esquemática, con puntos clave y rápida lectura. Contexto de navegación: ${contextUrl}`;
    } else if (mode === 'explain') {
      systemInstruction += ` Explica el concepto de forma clara y accesible para cualquiera en 2-3 párrafos cortos.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return NextResponse.json({
      text: response.text || 'Sin respuesta generada.',
      status: 'success',
    });
  } catch (error: any) {
    console.error('Error en Fenixy Gemini API:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Error al comunicarse con Gemini',
        fallback: 'El motor Fenixy AI está listo. Verifica tu conexión de red.',
      },
      { status: 500 }
    );
  }
}
