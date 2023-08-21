import styles from './FormField.module.css';

export default function FormField(props) {
  return (
    <div className={styles.formSection}>
      <label className={styles.formLabel} htmlFor={props.id}>
        {props.label}
      </label>
      <input className={styles.inputField} name={props.id} type={props.type} placeholder={props.label} />
    </div>
  );
}
