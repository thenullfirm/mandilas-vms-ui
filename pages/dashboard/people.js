import React, { useEffect, useState } from 'react';
import getAdmin from '@/config/getAdmin';
import getVisitors from '@/config/getVisitors';
import { useRouter } from 'next/navigation';
import VisitorTable from '@/components/VisitorTable/VistorTable';
import NavBar from '@/components/Navigation/NavBar';

export default function Dashboard() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [employeeSchedule, setEmployeeSchedule] = useState({});

  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  const getVisitorData = async () => {
    const { data, schedule } = await getVisitors('employee');
    setDataLoaded(data);
    setEmployeeSchedule(schedule);
  };

  useEffect(() => {
    getAdmin(loginRedirect);

    getVisitorData();
  }, []);

  return (
    <div>
      <NavBar checker={loginRedirect} />
      <h1>Dashboard</h1>
      {!dataLoaded ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1 style={{ color: 'purple' }}>Employees</h1>

          <VisitorTable tableId="employee" data={employeeSchedule} />
        </div>
      )}
    </div>
  );
}
