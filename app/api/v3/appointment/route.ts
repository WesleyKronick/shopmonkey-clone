// Appointment API Routes
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    let query = supabaseAdmin
      .from('appointments')
      .select('*, customers(first_name, last_name), vehicles(year, make, model)', { count: 'exact' })
      .is('deleted_at', null)
      .order('start_time', { ascending: true })
      .range(skip, skip + limit - 1);
    
    const whereParam = searchParams.get('where');
    if (whereParam) {
      try {
        const where = JSON.parse(whereParam);
        Object.entries(where).forEach(([key, value]) => {
          if (typeof value === 'object' && value.$gte) {
            query = query.gte(key, value.$gte);
          } else if (typeof value === 'object' && value.$lt) {
            query = query.lt(key, value.$lt);
          } else {
            query = query.eq(key, value);
          }
        });
      } catch (e) {
        console.error('Invalid where parameter:', e);
      }
    }
    
    const { data, error, count } = await query;
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: data || [],
      meta: {
        total: count || 0,
        hasMore: skip + (data?.length || 0) < (count || 0),
      },
    });
  } catch (error) {
    console.error('Appointment GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from('appointments')
      .insert([body])
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Appointment POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create appointment' },
      { status: 500 }
    );
  }
}
