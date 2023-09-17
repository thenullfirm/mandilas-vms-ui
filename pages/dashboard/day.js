import React, { useRef, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import getVisitors from '@/config/getVisitors';
import logout from '@/config/logout';
import { useRouter } from 'next/navigation';
import VisitorTable from '@/components/VisitorTable/VistorTable';

export default function Dashboard() {
  const dataRef = useRef();
  const timeRef = useRef();

  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  const getVisitorData = async () => {
    const { data, schedule } = await getVisitors('time');
    dataRef.current = data;
    timeRef.current = schedule;
  };

  const dataLoaded = dataRef.current;
  const timeSchedule = timeRef.current;

  useEffect(() => {
    getAdmin(loginRedirect);

    getVisitorData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {!dataLoaded ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1 style={{ color: 'purple' }}>Date of Visit</h1>

          <VisitorTable tableId="time" data={timeSchedule} />
        </div>
      )}
      <button onClick={() => logout(loginRedirect)}>Logout</button>
    </div>
  );
}
