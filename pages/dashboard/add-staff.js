import React, { useState, useEffect } from 'react';
import getAdmin from '@/config/getAdmin';
import { serverUrl } from '@/next.config';
import { useRouter } from 'next/navigation';
import FormFieldInput from '@/components/FormField/FormFieldInput';
import Submit from '@/components/FormField/Submit';
import NavBar from '@/components/Navigation/NavBar';

export default function Dashboard() {
  const [formData, setFormData] = useState({});
  const [feedback, setFeedback] = useState({});

  const { push } = useRouter();

  const loginRedirect = (info) => {
    if (!info.loggedIn) {
      push('/login');
    }
  };

  useEffect(() => {
    getAdmin(loginRedirect);
  }, []);

  const handleSubmit = async (event) => {
    const formInfo = event.target;

    let employeeForm = {};

    employeeForm['employeeName'] = formInfo.employeeName.value;
    employeeForm['employeeEmail'] = formInfo.employeeEmail.value;

    try {
      const response = await fetch(`${serverUrl}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeForm),
      });
      const responseData = await response.json();
    } catch (error) {
      console.error('Error posting data:', error);
    }

    event.preventDefault();
    formInfo.reset();
  };

  return (
    <div>
      <NavBar checker={loginRedirect} />
      <h1>Add Employee</h1>
      <div>
        <form onSubmit={handleSubmit} method="POST">
          <FormFieldInput type="text" id="employeeName" label="Employee name" />
          <FormFieldInput type="text" id="employeeEmail" label="Employee email" />
          <Submit title="Add Employee" />
        </form>
      </div>
    </div>
  );
}
