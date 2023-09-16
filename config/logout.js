import serverUrl from './serverUrl';

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

export default logout;
