import styles from './FormField.module.css';
import { DateTime } from 'luxon';

export default function FormField(props) {
  return (
    <div className={styles.formSection}>
      <label className={styles.formLabel} htmlFor={props.id}>
        {props.label}
      </label>
      {props.type === 'datetime-local' ? (
        <input
          className={styles.inputField}
          name={props.id}
          type={props.type}
          min={DateTime.fromISO(new Date().toISOString()).plus({ hours: 2 }).toString().slice(0, -13)}
          placeholder={props.label}
          required={true}
        />
      ) : (
        <input
          className={styles.inputField}
          name={props.id}
          type={props.type}
          placeholder={props.label}
          required={true}
        />
      )}
    </div>
  );
}
