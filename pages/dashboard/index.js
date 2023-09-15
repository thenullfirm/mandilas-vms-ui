import React, { useState, useEffect } from 'react';
import serverUrl from '@/config/serverUrl';
import scheduleFilter from '@/config/scheduleFilter';
import getEmployee from '@/config/getEmployee';
import { useRouter } from 'next/navigation';
import VisitorTable from '@/components/VisitorTable/VistorTable';

export default function Dashboard() {
  let visitorData;

  const [dataLoaded, setDataLoaded] = useState(false);
  const [employeeSchedule, setEmployeeSchedule] = useState([]);
  const [timeSchedule, setTimeSchedule] = useState([]);

  const { push } = useRouter();

  useEffect(() => {
    getAdmin();
    getVisitors();
  }, []);

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  const visitBucket = [];

  const getVisitors = async () => {
    try {
      const response = await fetch(`${serverUrl}/visitors`);
      const responseData = await response.json();
      visitorData = responseData;

      // console.log('Visitor data:', visitorData);

      for (const [key, value] of Object.entries(visitorData)) {
        for (const [innerKey, innerValue] of Object.entries(value.visits)) {
          const visitorRow = [innerValue.timeOfVisit];

          const employeeId = innerValue.employee;
          const employeeInfo = await getEmployee(employeeId);

          visitorRow.push(value.visitorName);
          visitorRow.push(value.visitorEmail);
          visitorRow.push(employeeInfo['employeeName']);
          visitorRow.push(employeeInfo['employeeEmail']);
          visitorRow.push(employeeId);

          visitBucket.push(visitorRow);
        }
      }

      /* sort visitor info by date in descending order */
      visitBucket.sort((a, b) => {
        const aTime = new Date(`${a[0]}`);
        const bTime = new Date(`${b[0]}`);
        if (aTime && bTime) {
          return aTime - bTime;
        } else if (aTime) {
          return -1;
        } else if (bTime) {
          return 1;
        }
        return 0;
      });

      visitBucket.reverse();

      /* 5 = employee id ; 0 = time of visit*/
      setDataLoaded(true);
      setEmployeeSchedule(scheduleFilter(visitBucket, 'employee'));
      setTimeSchedule(scheduleFilter(visitBucket, 'time'));
    } catch (error) {
      console.error('Error fetching data:', error);
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
      console.error('Error posting data:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {!dataLoaded ? (
        <p>Loading ...</p>
      ) : (
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link" href="#time">
                Time of Visit
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#employee">
                Employees
              </a>
            </li>
          </ul>

          {console.log('time: ', timeSchedule.list)}
          {console.log('employee: ', employeeSchedule.list)}

          <VisitorTable tableId="time" data={timeSchedule} />
          <VisitorTable tableId="employee" data={employeeSchedule} />
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
