'use client';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const patients = [
  {
    userName: 'PeraKralj90',
    id: '3Vzqb08WYdMnvjFktXKsQvPNiAn2',
    doctorId: '25Y429fDcdSovEyKOZzB17wN2R43',
    email: 'test5@gmail.com',
    firstName: 'Petar',
    lastName: 'Peric',
    role: 'user',
    updatedAt: { seconds: 1742208375, nanoseconds: 449000000 },
    createdAt: { seconds: 1742208375, nanoseconds: 449000000 },
  },
  {
    userName: 'test user 10',
    id: 'LrgS3KFGiVPSqzT4plo80IoymZk1',
    doctorId: '25Y429fDcdSovEyKOZzB17wN2R43',
    email: 'test7@gmail.com',
    firstName: 'Predrag',
    lastName: 'Rajkovic',
    role: 'user',
    updatedAt: { seconds: 1742208509, nanoseconds: 852000000 },
    createdAt: { seconds: 1742208438, nanoseconds: 427000000 },
  },
  {
    userName: 'PeraKralj90',
    id: '3Vzqb08WYdMnvjFktXKsQvPNiAn2',
    doctorId: '25Y429fDcdSovEyKOZzB17wN2R43',
    email: 'test5@gmail.com',
    firstName: 'Petar',
    lastName: 'Peric',
    role: 'user',
    updatedAt: { seconds: 1742208375, nanoseconds: 449000000 },
    createdAt: { seconds: 1742208375, nanoseconds: 449000000 },
  },
];
