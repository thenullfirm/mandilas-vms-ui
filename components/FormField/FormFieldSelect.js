import styles from './FormField.module.css';

export default function FormField(props) {
  const employeeInfo = props.employees;

  return (
    <div className={styles.formSection}>
      <label className={styles.formLabel} htmlFor={props.id}>
        {props.label}
      </label>
      <select name={props.id}>
        <option value="">-- Please select an Employee name --</option>
        {employeeInfo.map((emp, index) => {
          return (
            <option key={index} value={emp.employeeName}>
              {emp.employeeName}
            </option>
          );
        })}
      </select>
    </div>
  );
}
