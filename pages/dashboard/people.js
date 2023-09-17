import React, { useRef, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import getVisitors from '@/config/getVisitors';
import logout from '@/config/logout';
import { useRouter } from 'next/navigation';
import VisitorTable from '@/components/VisitorTable/VistorTable';

export default function Dashboard() {
  const dataRef = useRef();
  const employeeRef = useRef();

  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  const getVisitorData = async () => {
    const { data, schedule } = await getVisitors('employee');
    dataRef.current = data;
    employeeRef.current = schedule;
  };

  const dataLoaded = dataRef.current;
  const employeeSchedule = employeeRef.current;

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
          <h1 style={{ color: 'purple' }}>Employees</h1>

          <VisitorTable tableId="employee" data={employeeSchedule} />
        </div>
      )}
      <button onClick={() => logout(loginRedirect)}>Logout</button>
    </div>
  );
}
