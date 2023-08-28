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
  const [visitorData, setVisitorData] = useState([]);

  useEffect(() => {
    fetchWelcome();
    fetchEmployeeNames();
  }, []);

  const fetchWelcome = async () => {
    try {
      const response = await fetch('https://mandilas-api.onrender.com/');
      const jsonData = await response.json();
      setWelcome(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchEmployeeNames = async () => {
    try {
      const response = await fetch('https://mandilas-api.onrender.com/employees');
      const jsonData = await response.json();
      setEmployees(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const submitForm = async () => {
    try {
      console.log('Form data:', formData);
      const response = await fetch('https://mandilas-api.onrender.com/visitors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      setVisitorData(responseData);
      console.log('Visitor data:', visitorData);
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
  };

  return (
    <div>
      <Link href="/">
        <h2>{welcome === [] ? 'Loading ...' : welcome.info}</h2>
      </Link>
      <form onSubmit={handleSubmit}>
        <FormFieldInput type="text" id="visitorName" label="Visitor name" />
        <FormFieldInput type="text" id="visitorEmail" label="Visitor email" />
        <FormFieldSelect employees={employeeData} id="employee" label="Employee name" />
        <FormFieldInput type="datetime-local" id="timeOfVisit" label="Time of visitor" />
        <Submit title="Schedule Meeting" />
      </form>
      <hr />
    </div>
  );
}
