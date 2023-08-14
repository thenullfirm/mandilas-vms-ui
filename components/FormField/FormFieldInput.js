import styles from './FormField.module.css';

export default function FormField(props) {
  return (
    <div className={styles.formSection}>
      <label className={styles.formLabel} for={props.id}>
        {props.label}
      </label>
      <input className={styles.inputField} name={props.id} type="text" placeholder={props.label} />
    </div>
  );
}
