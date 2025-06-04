import React from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Printing } from "../../models/Card";

interface RightArrowProps {
  selection: Printing[];
  index: number;
  handleClick: () => void;
}

const RightArrow: React.FC<RightArrowProps> = ({
  selection,
  index,
  handleClick,
}) => {
  return (
    <>
      <button
        className={`arrow-right
                    ${
                      selection.length === 0 || index === selection.length - 1
                        ? "disabled"
                        : ""
                    }`}
        onClick={() => handleClick()}
        aria-label="next arrow button"
      >
        <FaAngleRight />
      </button>
    </>
  );
};

export default RightArrow;
