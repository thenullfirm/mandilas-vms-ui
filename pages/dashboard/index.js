import React, { useState, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import logout from '@/config/logout';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  useEffect(() => {
    getAdmin(loginRedirect);
    push('/dashboard/day');
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
