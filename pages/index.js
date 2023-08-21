import React, { useState, useEffect } from 'react';

import mainStyles from '@/app/globals.css';
import FormFieldInput from '@/components/FormField/FormFieldInput';
import FormFieldSelect from '@/components/FormField/FormFieldSelect';
import Submit from '@/components/FormField/Submit';

export default function Home() {
  const [welcome, setWelcome] = useState([]);
  const [employeeData, setEmployees] = useState([]);

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

  return (
    <div>
      <h2>{welcome.info}</h2>
      <form>
        <FormFieldInput type="text" id="visitor-name" label="Visitor name" />
        <FormFieldInput type="text" id="visitor-email" label="Visitor email" />
        <FormFieldSelect employees={employeeData} id="employee-name" label="Employee name" />
        <FormFieldInput type="text" id="employee-email" label="Employee email" />
        <FormFieldInput type="datetime-local" id="time-of-visit" label="Time of visitor" />
        <Submit title="Schedule Meeting" />
      </form>
    </div>
  );
}
