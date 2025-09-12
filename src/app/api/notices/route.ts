'''
import {NextRequest, NextResponse} from 'next/server';
import {
  getNotices,
  addNotice,
  deleteNotice,
} from '@/lib/firebase';

const TEACHER_CODE = process.env.TEACHER_CODE || 'jashimht89';

// 1. GET all notices
export async function GET() {
  try {
    const notices = await getNotices();
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

    const newNotice = await addNotice({title, description});
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

    await deleteNotice(id);
    return NextResponse.json({message: 'Notice deleted successfully'}, {status: 200});

  } catch (error) {
    console.error('Failed to delete notice:', error);
    return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
  }
}
'''