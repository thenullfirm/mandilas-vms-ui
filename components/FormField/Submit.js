import '@/app/globals.css';

export default function Submit(props) {
  return (
    <button id="submit" type="submit" className="formSection">
      {props.title}
    </button>
  );
}
