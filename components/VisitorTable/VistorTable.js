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
            <table className="table" id={props.tableId}>
              <thead>
                <tr style={{ color: 'red', textAlign: 'left', fontSize: '20px' }}>
                  <th scope="col">Time of Visit</th>
                  <span style={{ margin: '30px' }}></span>
                  <th scope="col">Visitor Name</th>
                  <span style={{ margin: '30px' }}></span>
                  <th scope="col">Visitor Email</th>
                  <span style={{ margin: '30px' }}></span>
                  <th scope="col">Employee Name</th>
                  <span style={{ margin: '30px' }}></span>
                  <th scope="col">Employee Email</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: 'left' }}>
                {feedback.map((info) => {
                  const date = new Date(`${info[0]}`).toLocaleString();
                  return (
                    <tr key={info.index}>
                      <th scope="row">{`${date}`}</th>
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
