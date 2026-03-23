import { NextRequest, NextResponse } from 'next/server'

// GET /api/projects - Fetch all projects
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement Supabase query
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .order('updated_at', { ascending: false })

    return NextResponse.json({
      success: true,
      data: [],
      message: 'Projects fetched successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, status, owner_id } = body

    if (!name || !description || !owner_id) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Implement Supabase insert
    // const { data, error } = await supabase
    //   .from('projects')
    //   .insert([{
    //     name,
    //     description,
    //     status: status || 'active',
    //     owner_id
    //   }])
    //   .select()

    return NextResponse.json(
      {
        success: true,
        data: { id: 'temp', name, description, status, owner_id },
        message: 'Project created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
