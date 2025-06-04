import React from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

interface CloseButtonProps {
  handleClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ handleClick }) => {
  return (
    <>
      <button className="card-printings-close" onClick={() => handleClick()}>
        <FaRegCircleXmark />
      </button>
    </>
  );
};

export default CloseButton;
