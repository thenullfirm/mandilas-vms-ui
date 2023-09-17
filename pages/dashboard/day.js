import React, { useRef, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import getVisitors from '@/config/getVisitors';
import logout from '@/config/logout';
import { useRouter } from 'next/navigation';
import VisitorTable from '@/components/VisitorTable/VistorTable';

export default function Dashboard() {
  const dataLoaded = useRef();
  const timeSchedule = useRef();

  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  useEffect(async () => {
    getAdmin(loginRedirect);
    const { data, schedule } = await getVisitors('time');
    // dataLoaded.current = data;
    // timeSchedule.current = schedule;
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {!dataLoaded ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1 style={{ color: 'purple' }}>Date of Visit</h1>
          {console.log('time: ', timeSchedule.list)}

          {/* <VisitorTable tableId="time" data={timeSchedule} /> */}
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
