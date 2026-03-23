import { NextRequest, NextResponse } from 'next/server'

// GET /api/pages - Fetch all pages
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement Supabase query
    // const { data, error } = await supabase
    //   .from('pages')
    //   .select('*')
    //   .order('created_at', { ascending: false })

    return NextResponse.json({
      success: true,
      data: [],
      message: 'Pages fetched successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

// POST /api/pages - Create a new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, content, published, created_by } = body

    if (!slug || !title || !content) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Implement Supabase insert
    // const { data, error } = await supabase
    //   .from('pages')
    //   .insert([{ slug, title, content, published: !!published, created_by }])
    //   .select()

    return NextResponse.json(
      {
        success: true,
        data: { id: 'temp', slug, title, content, published, created_by },
        message: 'Page created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create page' },
      { status: 500 }
    )
  }
}
