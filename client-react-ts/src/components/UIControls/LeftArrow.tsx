import React from "react";
import { FaAngleLeft } from "react-icons/fa6";

interface LeftArrowProps {
  index: number;
  handleClick: () => void;
}

const LeftArrow: React.FC<LeftArrowProps> = ({ index, handleClick }) => {
  return (
    <>
      <button
        className={`arrow-left ${index === 0 ? "disabled" : ""}`}
        onClick={() => handleClick()}
        aria-label="previous arrow button"
      >
        <FaAngleLeft />
      </button>
    </>
  );
};

export default LeftArrow;
