import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from 'react-tooltip';

export default function EditButton({ onClick, text }) {
  return (
    <>
      <ReactTooltip effect="solid" />
      <button className="w-0">
        <FontAwesomeIcon data-tip={text} className="cursor-pointer text-white" icon={faPencilAlt} onClick={onClick} /> 
      </button>
    </>
  );
}