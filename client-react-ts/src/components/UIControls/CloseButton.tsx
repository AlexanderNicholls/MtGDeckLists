import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import "../../styles/CloseButton.css";

interface CloseButtonProps {
  handleClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ handleClick }) => {
  return (
    <>
      <button
        className="card-printings-close"
        aria-label={"close printings button"}
        onClick={() => handleClick()}
      >
        <FaRegCircleXmark />
      </button>
    </>
  );
};

export default CloseButton;
