import { serverUrl } from '@/envConfig';

const getAdmin = async (loginCheck) => {
  try {
    const response = await fetch(`${serverUrl}/admin`);
    const responseData = await response.json();
    const adminData = responseData[0];
    loginCheck(adminData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getAdmin;
