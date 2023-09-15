import getEmployee from './getEmployee';

const scheduleFilter = (data, value) => {
  const display = {};

  let anchor;

  if (value === 'employee') {
    anchor = 5;

    for (const visit in data) {
      const displayKey = [];
      displayKey.push(data[visit][3]);
      displayKey.push(data[visit][anchor]);

      if (!display.hasOwnProperty(displayKey)) {
        display[displayKey] = [];
        display[displayKey].push(data[visit]);
      } else {
        display[displayKey].push(data[visit]);
      }
    }
  } else if (value === 'time') {
    anchor = 0;

    for (const visit in data) {
      const time = data[visit][anchor];
      const dateChunk = time.slice(0, 10);
      const rawDate = new Date(dateChunk).toUTCString();
      const outputDate = rawDate.slice(0, 16);

      if (!display.hasOwnProperty(outputDate)) {
        display[`${outputDate}`] = [];
        display[`${outputDate}`].push(data[visit]);
      } else {
        display[`${outputDate}`].push(data[visit]);
      }
    }
  }

  const feedback = { filter: value, list: [] };

  for (const [key, value] of Object.entries(display)) {
    feedback['list'].push([key, value]);
  }

  return feedback;
};

export default scheduleFilter;
