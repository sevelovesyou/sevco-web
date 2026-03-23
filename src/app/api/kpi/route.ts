import { NextRequest, NextResponse } from 'next/server'

// GET /api/kpi - Fetch KPI metrics
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const metric = searchParams.get('metric') // 'revenue', 'users', 'projects', 'streams'
    const days = searchParams.get('days') || '30' // Last N days

    // TODO: Implement Supabase query
    // const { data, error } = await supabase
    //   .from('kpi_data')
    //   .select('*')
    //   .gte('timestamp', new Date(Date.now() - parseInt(days) * 24 * 60 * 60 * 1000))
    //   .eq('metric', metric)
    //   .order('timestamp', { ascending: true })

    return NextResponse.json({
      success: true,
      data: [],
      metric,
      days,
      message: 'KPI data fetched successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch KPI data' },
      { status: 500 }
    )
  }
}

// POST /api/kpi - Add KPI data point
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { metric, value } = body

    if (!metric || value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Implement Supabase insert
    // const { data, error } = await supabase
    //   .from('kpi_data')
    //   .insert([{
    //     metric,
    //     value,
    //     timestamp: new Date().toISOString()
    //   }])
    //   .select()

    return NextResponse.json(
      {
        success: true,
        data: { id: 'temp', metric, value, timestamp: new Date() },
        message: 'KPI data recorded successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to record KPI data' },
      { status: 500 }
    )
  }
}
