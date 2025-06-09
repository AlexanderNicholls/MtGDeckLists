import { useContext } from "react";
import DataContext from "../../context/DataContext";
import { FaRegClone } from "react-icons/fa6";

interface PrintingsIconProps {
  showPrintingsIcon: boolean;
}

const PrintingsIcon: React.FC<PrintingsIconProps> = ({ showPrintingsIcon }) => {
  const { cards, index } = useContext(DataContext);
  return (
    <>
      {showPrintingsIcon && cards[index]?.printings.length > 1 && (
        <button className="card-printings-icon" aria-label="card printings">
          <FaRegClone />
          <span className="card-printings-count">
            {cards[index]?.printings.length}
          </span>
        </button>
      )}
    </>
  );
};

export default PrintingsIcon;
