import React, { useState, useEffect } from 'react';
import serverUrl from '@/config/serverUrl';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  let employeeData;
  let visitorData;

  const { push } = useRouter();

  useEffect(() => {
    getAdmin();
    getEmployees();
    getVisitors();
  }, []);

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  const selectEmployee = (id) => {
    const output = [];

    for (let i = 0; i < employeeData.length; i++) {
      if (employeeData[i]._id === id) {
        output.push(employeeData[i].employeeName);
        output.push(employeeData[i].employeeEmail);
      }
    }

    return output;
  };

  const getEmployees = async () => {
    try {
      const response = await fetch(`${serverUrl}/employees`);
      const responseData = await response.json();
      employeeData = responseData;
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

      let visitBucket = [];

      for (const [key, value] of Object.entries(visitorData)) {
        const visitorRow = [];
        visitorRow.push(value.visitorName);
        visitorRow.push(value.visitorEmail);
        const innerRow = [];

        for (const [innerKey, innerValue] of Object.entries(value.visits)) {
          innerRow.push([innerValue.employee, innerValue.timeOfVisit]);
        }

        visitorRow.push(innerRow);
        visitBucket.push(visitorRow);
      }

      for (let i = 0; i < visitBucket.length; i++) {
        const scheduleInfo = visitBucket[i][visitBucket[i].length - 1];
        for (let x = 0; x < scheduleInfo.length; x++) {
          const [employeeId, timeOfVisit] = scheduleInfo[x];
          console.log([selectEmployee(employeeId)], timeOfVisit);
        }
      }

      // console.log(visitBucket);
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
      <button onClick={logout}>Logout</button>
    </div>
  );
}
