import '@/app/globals.css';
import { DateTime } from 'luxon';

export default function FormField(props) {
  const minimumTime = DateTime.fromISO(new Date().toISOString()).plus({ hours: 2 }).toString().slice(0, -13);

  return (
    <div className="formSection">
      <label className="formLabel" htmlFor={props.id}>
        {props.label}
      </label>
      {props.type === 'datetime-local' ? (
        <input name={props.id} type={props.type} min={minimumTime} placeholder={props.label} required={true} />
      ) : (
        <input name={props.id} type={props.type} placeholder={props.label} required={true} />
      )}
    </div>
  );
}
