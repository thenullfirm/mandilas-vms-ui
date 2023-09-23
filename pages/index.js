import React, { useState, useEffect } from 'react';
import { serverUrl } from '@/envConfig';
import Link from 'next/link';
import FormFieldInput from '@/components/FormField/FormFieldInput';
import FormFieldSelect from '@/components/FormField/FormFieldSelect';
import Submit from '@/components/FormField/Submit';
import '@/app/globals.css';

export default function Home() {
  const [welcome, setWelcome] = useState([]);
  const [employeeData, setEmployees] = useState([]);
  const [formData, setFormData] = useState({});
  const [notification, setNotification] = useState('');

  useEffect(() => {
    fetchWelcome();
    fetchEmployeeNames();
  }, []);

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
      const response = await fetch(`${serverUrl}/visitors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
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
    formInfo.reset();
  };

  const clearNotification = () => {
    setNotification('');
  };

  return (
    <div className="formBlock">
      <span>
        {notification ? (
          <p className="formNotice">
            You have successfully scheduled a meeting with{' '}
            {employeeData.map((emp) => {
              if (emp._id === formData.employee) {
                return emp.employeeName;
              }
            })}
            <span onClick={clearNotification} className="clearNotification">
              x
            </span>
          </p>
        ) : (
          ''
        )}
      </span>
      <h1 className="formTitle">{!welcome.info ? 'Loading ...' : <Link href="/">{welcome.info}</Link>}</h1>
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
