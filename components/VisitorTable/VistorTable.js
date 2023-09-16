import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';

export default function VistorTable(props) {
  let anchor;

  return (
    <div>
      {props.data.list.map((visits) => {
        const feedback = visits[1];
        anchor = props.data.filter === 'employee' ? visits[0].split(',')[0] : visits[0];

        return (
          <TableContainer key={visits.index}>
            <h2 style={{ color: 'green' }}>{anchor}</h2>
            <Table id={props.tableId} variant="simple">
              <Thead>
                <Tr style={{ color: 'red', textAlign: 'left', fontSize: '20px' }}>
                  <Th>Time of Visit</Th>
                  <span style={{ margin: '30px' }}></span>
                  <Th>Visitor Name</Th>
                  <span style={{ margin: '30px' }}></span>
                  <Th>Visitor Email</Th>
                  <span style={{ margin: '30px' }}></span>
                  <Th>Employee Name</Th>
                  <span style={{ margin: '30px' }}></span>
                  <Th>Employee Email</Th>
                </Tr>
              </Thead>
              <Tbody style={{ textAlign: 'left' }}>
                {feedback.map((info) => {
                  const date = new Date(`${info[0]}`).toLocaleString();

                  return (
                    <Tr key={info.index}>
                      <Td>{`${date}`}</Td>
                      <span style={{ margin: '30px' }}></span>
                      <Td>{`${info[1]}`}</Td>
                      <span style={{ margin: '30px' }}></span>
                      <Td>{`${info[2]}`}</Td>
                      <span style={{ margin: '30px' }}></span>
                      <Td>{`${info[3]}`}</Td>
                      <span style={{ margin: '30px' }}></span>
                      <Td>{`${info[4]}`}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        );
      })}
    </div>
  );
}
