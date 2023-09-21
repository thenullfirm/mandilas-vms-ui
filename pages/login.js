import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverUrl } from '@/envConfig';
import FormFieldInput from '@/components/FormField/FormFieldInput';
import Submit from '@/components/FormField/Submit';

export default function Login() {
  const { push } = useRouter();

  useEffect(() => {
    getAdmin();
  }, []);

  const loginRedirect = (info) => {
    if (info.loggedIn) {
      push('/dashboard/day');
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

  const handleSubmit = async (event) => {
    const formInfo = event.target;

    let loginData = {};

    loginData['username'] = formInfo.username.value;
    loginData['password'] = formInfo.password.value;

    try {
      const response = await fetch(`${serverUrl}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const responseData = await response.json();
      loginRedirect(responseData.info);
    } catch (error) {
      console.error('Error posting data:', error);
    }

    event.preventDefault();
    formInfo.reset();
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} method="POST">
        <FormFieldInput type="text" id="username" label="Admin username" />
        <FormFieldInput type="password" id="password" label="Password" />
        <Submit title="Login to Dashboard" />
      </form>
    </div>
  );
}
