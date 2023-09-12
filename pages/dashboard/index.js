import React, { useState, useEffect } from 'react';
import serverUrl from '@/config/serverUrl';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  let employeeData;
  let visitorData;

  const [dataLoaded, setDataLoaded] = useState(false);
  const [schedule, setSchedule] = useState([]);

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

  const getEmployee = async (id) => {
    try {
      const response = await fetch(`${serverUrl}/employees/${id}`);
      const responseData = await response.json();
      employeeData = responseData;
      return employeeData;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getVisitors = async () => {
    try {
      const response = await fetch(`${serverUrl}/visitors`);
      const responseData = await response.json();
      visitorData = responseData;

      // console.log('Visitor data:', visitorData);

      const visitBucket = [];

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

          // visitorRow.sort();

          visitBucket.push(visitorRow);
        }
      }

      setDataLoaded(true);
      // console.log(visitBucket);
      setSchedule(visitBucket);
      // 5 = employee id ; 0 = time of visit
      scheduleFilter('time');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const scheduleFilter = (value) => {
    const display = {};

    let anchor;

    if (value === 'employee') {
      anchor = 5;

      for (const visit in schedule) {
        // console.log(schedule[visit]);

        if (!display.hasOwnProperty(schedule[visit][anchor])) {
          display[`${schedule[visit][anchor]}`] = [];
        } else {
          display[`${schedule[visit][anchor]}`].push(schedule[visit]);
        }
      }
    } else if (value === 'time') {
      anchor = 0;

      for (const visit in schedule) {
        // console.log(schedule[visit]);

        const time = schedule[visit][anchor];
        const dateChunk = time.slice(0, 10);
        const rawDate = new Date(dateChunk).toUTCString();
        const outputDate = rawDate.slice(0, 16);

        if (!display.hasOwnProperty(outputDate)) {
          display[`${outputDate}`] = [];
        } else {
          display[`${outputDate}`].push(schedule[visit]);
        }
      }
    }

    console.log(display);
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
        <table className="table">
          <thead>
            <tr style={{ color: 'red', textAlign: 'left', fontSize: '20px' }}>
              <th scope="col">Time of Visit</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Visitor Name</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Visitor Email</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Employee Name</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Employee Email</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'left' }}>
            {schedule.map((info) => {
              // console.log(info);
              const date = new Date(`${info[0]}`).toLocaleString();
              return (
                <tr key={info.index}>
                  <th scope="row">{`${date}`}</th>
                  <span style={{ margin: '30px' }}></span>
                  <td>{`${info[1]}`}</td>
                  <span style={{ margin: '30px' }}></span>
                  <td>{`${info[2]}`}</td>
                  <span style={{ margin: '30px' }}></span>
                  <td>{`${info[3]}`}</td>
                  <span style={{ margin: '30px' }}></span>
                  <td>{`${info[4]}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
