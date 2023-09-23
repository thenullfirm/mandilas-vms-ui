import React, { useState, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/Navigation/NavBar';

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
      <NavBar internal="false" checker={loginRedirect} />
      <h1>Dashboard</h1>
    </div>
  );
}
