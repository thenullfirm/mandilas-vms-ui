import React, { useState, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import { useRouter } from 'next/navigation';
import NavBar from '@/components/Navigation/NavBar';
import '@/app/globals.css';

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
      <NavBar internal={true} checker={loginRedirect} />
      <div className="page">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
