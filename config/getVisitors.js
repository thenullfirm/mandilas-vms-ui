import { serverUrl } from '@/envConfig';
import getEmployee from './getEmployee';
import scheduleFilter from './scheduleFilter';

const getVisitors = async (filter) => {
  let visitorData;
  let visitBucket = [];

  try {
    const response = await fetch(`${serverUrl}/visitors`);
    const responseData = await response.json();
    visitorData = responseData;

    for (const [key, value] of Object.entries(visitorData)) {
      for (const [innerKey, innerValue] of Object.entries(value.visits)) {
        const visitorRow = [innerValue.timeOfVisit];

        const employeeId = innerValue.employee;
        const employeeInfo = await getEmployee(employeeId);

        visitorRow.push(value.visitorName);
        visitorRow.push(value.visitorEmail);
        visitorRow.push(employeeInfo['employeeName']);
        visitorRow.push(employeeInfo['employeeEmail']);
        visitorRow.push(employeeId);

        visitBucket.push(visitorRow);
      }
    }

    /* sort visitor info by date in descending order */
    visitBucket.sort((a, b) => {
      const aTime = new Date(`${a[0]}`);
      const bTime = new Date(`${b[0]}`);
      if (aTime && bTime) {
        return aTime - bTime;
      } else if (aTime) {
        return -1;
      } else if (bTime) {
        return 1;
      }
      return 0;
    });

    visitBucket.reverse();

    /* 5 = employee id ; 0 = time of visit*/
    return { data: true, schedule: scheduleFilter(visitBucket, filter) };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default getVisitors;
