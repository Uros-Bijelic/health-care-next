import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const storeCookies = await cookies();

    const { token }: { token: string } = await req.json();
    // console.log('token U RUTI AUTH SAMO', token);

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    storeCookies.set('token', token, { httpOnly: true });

    return NextResponse.json({ message: 'Token is valid' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message || 'Something went wrong' });
    }
  }
};
