import React, { useEffect } from 'react';
import serverUrl from '@/config/serverUrl';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { push } = useRouter();

  useEffect(() => {
    getAdmin();
  }, []);

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  const getAdmin = async () => {
    try {
      const response = await fetch(`${serverUrl}/admin`);
      const responseData = await response.json();
      const adminData = responseData[0];
      loginRedirect(adminData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(`${serverUrl}/admin`);
      const responseData = await response.json();
      const adminData = responseData[0];

      const adminResponse = await fetch(`${serverUrl}/admin/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: adminData.username }),
      });
      const adminResponseData = await adminResponse.json();
      loginRedirect(adminData);
      location.reload();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
