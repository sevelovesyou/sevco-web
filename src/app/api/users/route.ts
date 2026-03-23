import { NextRequest, NextResponse } from 'next/server'

// GET /api/users - Fetch all users
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement Supabase query
    // const { data, error } = await supabase
    //   .from('users')
    //   .select('*')
    //   .order('created_at', { ascending: false })

    return NextResponse.json({
      success: true,
      data: [],
      message: 'Users fetched successfully',
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, role } = body

    if (!email || !name || !role) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Implement Supabase insert
    // const { data, error } = await supabase
    //   .from('users')
    //   .insert([{ email, name, role }])
    //   .select()

    return NextResponse.json(
      {
        success: true,
        data: { id: 'temp', email, name, role },
        message: 'User created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
