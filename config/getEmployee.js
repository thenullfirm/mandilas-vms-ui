import { serverUrl } from '@/next.config';

const getEmployee = async (id) => {
  let employeeData;

  try {
    const response = await fetch(`${serverUrl}/employees/${id}`);
    const responseData = await response.json();
    employeeData = responseData;
    return employeeData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getEmployee;
