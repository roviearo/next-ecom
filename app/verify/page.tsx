import React from 'react';
import { notFound, redirect } from 'next/navigation';

interface Props {
  searchParams: { token: string; userId: string };
}

export default function Verify(props: Props) {
  const { token, userId } = props.searchParams;

  if (!token || !userId) return notFound();
  return (
    <div className='animate-pulse p-5 text-center text-3xl opacity-70'>
      Please wait...
      <p>We are verifying your email</p>
    </div>
  );
}
