import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import mainStyles from '@/app/globals.css';
import FormFieldInput from '@/components/FormField/FormFieldInput';
import FormFieldSelect from '@/components/FormField/FormFieldSelect';
import Submit from '@/components/FormField/Submit';

export default function Home() {
  const [welcome, setWelcome] = useState([]);
  const [employeeData, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  // const [visitorData, setVisitorData] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchWelcome();
    fetchEmployeeNames();
  }, []);

  // const serverUrl = 'https://mandilas-api.onrender.com';
  const serverUrl = 'http://localhost:5000';

  const fetchWelcome = async () => {
    try {
      const response = await fetch(`${serverUrl}`);
      const jsonData = await response.json();
      setWelcome(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchEmployeeNames = async () => {
    try {
      const response = await fetch(`${serverUrl}/employees`);
      const jsonData = await response.json();
      setEmployees(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const submitForm = async () => {
    try {
      // console.log('Form data:', formData);
      const response = await fetch(`${serverUrl}/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      // setVisitorData(responseData);
      // console.log('Visitor data:', visitorData);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  const handleSubmit = (event) => {
    const formInfo = event.target;

    let visitorForm = {};

    visitorForm['visitorName'] = formInfo.visitorName.value;
    visitorForm['visitorEmail'] = formInfo.visitorEmail.value;
    visitorForm['employee'] = formInfo.employee.value;
    visitorForm['timeOfVisit'] = formInfo.timeOfVisit.value;

    setFormData(visitorForm);
    submitForm();
    event.preventDefault();
    setNotification(true);
    console.log(employeeData);
    formInfo.reset();
  };

  const clearNotification = () => {
    setNotification('');
  };

  return (
    <div>
      <span>
        {notification ? (
          <p style={{ marginBottom: 20, color: 'grey', fontSize: 20 }}>
            You have successfully scheduled a meeting with{' '}
            {employeeData.map((emp) => {
              if (emp._id === formData.employee) {
                return emp.employeeName;
              }
            })}
            <span
              onClick={clearNotification}
              style={{
                marginLeft: 20,
                color: 'red',
                fontWeight: 'bold',
                fontSize: 40,
                marginRight: 10,
                border: '1px solid red',
                padding: '2px 6px',
                borderRadius: 60,
              }}
            >
              x
            </span>
          </p>
        ) : (
          ''
        )}
      </span>
      <h2>{!welcome.info ? 'Loading ...' : <Link href="/">{welcome.info}</Link>}</h2>
      <form onSubmit={handleSubmit}>
        <FormFieldInput type="text" id="visitorName" label="Visitor name" />
        <FormFieldInput type="text" id="visitorEmail" label="Visitor email" />
        <FormFieldSelect employees={employeeData} id="employee" label="Employee name" />
        <FormFieldInput type="datetime-local" id="timeOfVisit" label="Time of visitor" />
        <Submit title="Schedule Meeting" />
      </form>
    </div>
  );
}
