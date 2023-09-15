export default function EmployeeTable(props) {
  let anchor;
  return (
    <div>
      {props.data.list.map((visits) => {
        const feedback = visits[1];
        anchor = props.data.filter === 'employee' ? visits[0].split(',')[0] : visits[0];
        return (
          <div key={visits.index}>
            <h2 style={{ color: 'green' }}>{anchor}</h2>
            <table id={props.tableId}>
              <tr style={{ color: 'red', textAlign: 'left', fontSize: '20px' }}>
                <th>Time of Visit</th>
                <span style={{ margin: '30px' }}></span>
                <th>Visitor Name</th>
                <span style={{ margin: '30px' }}></span>
                <th>Visitor Email</th>
                <span style={{ margin: '30px' }}></span>
                <th>Employee Name</th>
                <span style={{ margin: '30px' }}></span>
                <th>Employee Email</th>
              </tr>
              <tbody style={{ textAlign: 'left' }}>
                {feedback.map((info) => {
                  const date = new Date(`${info[0]}`).toLocaleString();
                  return (
                    <tr key={info.index}>
                      <td>{`${date}`}</td>
                      <span style={{ margin: '30px' }}></span>
                      <td>{`${info[1]}`}</td>
                      <span style={{ margin: '30px' }}></span>
                      <td>{`${info[2]}`}</td>
                      <span style={{ margin: '30px' }}></span>
                      <td>{`${info[3]}`}</td>
                      <span style={{ margin: '30px' }}></span>
                      <td>{`${info[4]}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
