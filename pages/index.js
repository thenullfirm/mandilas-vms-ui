import mainStyles from '@/app/globals.css';
import FormFieldInput from '@/components/FormField/FormFieldInput';
import FormFieldTime from '@/components/FormField/FormFieldTime';
import Submit from '@/components/FormField/Submit';

export default function Home() {
  return (
    <div>
      <h2>Visitor Management System</h2>
      <form>
        <FormFieldInput id="visitor-name" label="Visitor name" />
        <FormFieldInput id="visitor-email" label="Visitor email" />
        <FormFieldInput id="employee-name" label="Employee name" />
        <FormFieldInput id="employee-email" label="Employee email" />
        <FormFieldTime id="time-of-visit" label="Time of visitor" />
        <Submit title="Schedule Meeting" />
      </form>
    </div>
  );
}
