import { useContext } from "react";
import { FaRegClone } from "react-icons/fa6";
import CardContext from "../../context/CardContext";

interface PrintingsIconProps {
  showPrintingsIcon: boolean;
  handleClick: () => void;
}

const PrintingsIcon: React.FC<PrintingsIconProps> = ({
  showPrintingsIcon,
  handleClick,
}) => {
  const { cards, index } = useContext(CardContext);
  return (
    <>
      {showPrintingsIcon && cards[index]?.printings.length > 1 && (
        <button
          className="card-printings-icon"
          aria-label="card printings"
          onClick={() => handleClick()}
        >
          <FaRegClone />
          <span className="card-printings-count" aria-label="printings count">
            {cards[index]?.printings.length}
          </span>
        </button>
      )}
    </>
  );
};

export default PrintingsIcon;
