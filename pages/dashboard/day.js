import React, { useEffect, useState } from 'react';
import getAdmin from '@/config/getAdmin';
import getVisitors from '@/config/getVisitors';
import logout from '@/config/logout';
import { useRouter } from 'next/navigation';
import VisitorTable from '@/components/VisitorTable/VistorTable';

export default function Dashboard() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [timeSchedule, setTimeSchedule] = useState({});

  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  const getVisitorData = async () => {
    const { data, schedule } = await getVisitors('time');
    setDataLoaded(data);
    setTimeSchedule(schedule);
  };

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
