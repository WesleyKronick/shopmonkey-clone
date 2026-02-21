// Customer API Routes - GET (list) and POST (create)
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    let query = supabaseAdmin
      .from('customers')
      .select('*', { count: 'exact' })
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);
    
    // Apply filters if provided
    const whereParam = searchParams.get('where');
    if (whereParam) {
      try {
        const where = JSON.parse(whereParam);
        Object.entries(where).forEach(([key, value]) => {
          query = query.eq(key, value);
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
    console.error('Customer GET error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabaseAdmin
      .from('customers')
      .insert([body])
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Customer POST error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
