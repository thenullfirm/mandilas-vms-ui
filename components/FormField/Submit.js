import styles from './FormField.module.css';

export default function Submit(props) {
  return (
    <div className={styles.formSection}>
      <button type="submit">{props.title}</button>
    </div>
  );
}
