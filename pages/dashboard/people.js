import React, { useState, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import getVisitors from '@/config/getVisitors';
import logout from '@/config/logout';
import { useRouter } from 'next/navigation';
import VisitorTable from '@/components/VisitorTable/VistorTable';

export default function Dashboard() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [employeeSchedule, setEmployeeSchedule] = useState([]);
  const [timeSchedule, setTimeSchedule] = useState([]);

  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  useEffect(() => {
    getAdmin(loginRedirect);
    getVisitors(setDataLoaded, setEmployeeSchedule, 'employee');
  }, []);

  const visitBucket = [];

  return (
    <div>
      <h1>Dashboard</h1>
      {!dataLoaded ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <h1 style={{ color: 'purple' }}>Employee</h1>
          {/* {console.log('time: ', timeSchedule.list)} */}
          {console.log('employee: ', employeeSchedule.list)}

          <VisitorTable tableId="employee" data={employeeSchedule} />
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
