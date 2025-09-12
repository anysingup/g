import {NextRequest, NextResponse} from 'next/server';

const TEACHER_CODE = process.env.TEACHER_CODE || 'jashimht89';

// This is a placeholder. In a real app, you'd integrate with a database.
let notices: any[] = []; 

// 1. GET all notices
export async function GET() {
  try {
    // In a real app, you would fetch from a database.
    // For now, just returning the in-memory array.
    return NextResponse.json(notices);
  } catch (error) {
    console.error('Failed to fetch notices:', error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}

// 2. POST a new notice
export async function POST(request: NextRequest) {
  try {
    const {title, description} = await request.json();
    const auth = request.headers.get('Authorization');

    if (auth !== TEACHER_CODE) {
      return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }

    if (!title || !description) {
      return NextResponse.json({message: 'Title and description are required'}, {status: 400});
    }
    
    const newNotice = { id: Date.now().toString(), title, description, createdAt: new Date().toISOString() };
    notices.unshift(newNotice); // Add to the beginning

    return NextResponse.json(newNotice, {status: 201});

  } catch (error) {
    console.error('Failed to add notice:', error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}

// 3. DELETE a notice
export async function DELETE(request: NextRequest) {
  try {
    const {id} = await request.json();
    const auth = request.headers.get('Authorization');

    if (auth !== TEACHER_CODE) {
      return NextResponse.json({message: 'Unauthorized'}, {status: 401});
    }

    if (!id) {
      return NextResponse.json({message: 'Notice ID is required'}, {status: 400});
    }
    
    const initialLength = notices.length;
    notices = notices.filter(notice => notice.id !== id);

    if (notices.length === initialLength) {
        return NextResponse.json({ message: 'Notice not found' }, { status: 404 });
    }

    return NextResponse.json({message: 'Notice deleted successfully'}, {status: 200});

  } catch (error) {
    console.error('Failed to delete notice:', error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
