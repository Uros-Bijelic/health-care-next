import { admin } from '@/lib/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get('Authorization');

  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  console.log('authHeader U RUTI DA VIDIMP STA  SE DESABAs', authHeader);
  const split = authHeader.split(' ');
  console.log('SPLIT SPLIT SPLIT SPLITSPLIT SPLIT SPLIT SPLITSPLIT', split);
  const token = authHeader.split(' ')[1];

  console.log('TOKEN', token);
  console.log('TOKEN TYPEOF', typeof token);
  // const parsedToken = JSON.parse(token);
  // console.log('PARSED TOKEN PARSED TOKEN', parsedToken);

  const verifiedToken = await admin.auth().verifyIdToken(token);
  console.log('VERIFIED TOKEN U RUTI', verifiedToken);

  // const token = authHeader.split(' ')[1]

  // console.log('authHeader', authHeader);

  return NextResponse.json({ message: 'Ovaji je kranji return' });
};
