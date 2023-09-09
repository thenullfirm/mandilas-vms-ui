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
          const visitorRow = [];

          visitorRow.push(value.visitorName);
          visitorRow.push(value.visitorEmail);

          const employeeId = innerValue.employee;
          const employeeInfo = await getEmployee(employeeId);

          visitorRow.push(innerValue.timeOfVisit, employeeInfo['employeeName'], employeeInfo['employeeEmail']);

          visitBucket.push(visitorRow);
        }
      }

      setDataLoaded(true);
      console.log(visitBucket);
      setSchedule(visitBucket);
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
        <table className="table">
          <thead>
            <tr style={{ color: 'red', textAlign: 'left' }}>
              <th scope="col">Visitor Name</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Visitor Email</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Time of Visit</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Employee Name</th>
              <span style={{ margin: '30px' }}></span>
              <th scope="col">Employee Email</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'left' }}>
            {schedule.map((info) => {
              console.log(info);
              const date = new Date(`${info[2]}`).toLocaleString();
              return (
                <tr key={info.index}>
                  <th scope="row">{`${info[0]}`}</th>
                  <span style={{ margin: '30px' }}></span>
                  <td>{`${info[1]}`}</td>
                  <span style={{ margin: '30px' }}></span>
                  <td>{`${date}`}</td>
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
