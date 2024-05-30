import React from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa";

const Cells = ({
  cells,
  rowIndex,
  cellIndex,
  toggle,
  gameplay,
  toggleComputer,
}) => {
  return (
    <div
      className="w-28 h-28 bg-stone-700 rounded-lg flex justify-center items-center"
      onClick={(e) =>
        gameplay === "player vs player"
          ? toggle(e, rowIndex, cellIndex)
          : toggleComputer(e, rowIndex, cellIndex)
      }
    >
      {cells === "x" && (
        <RxCross2 style={{ color: "white", transform: "scale(5)" }} />
      )}
      {cells === "o" && (
        <FaRegCircle style={{ color: "white", transform: "scale(5)" }} />
      )}
    </div>
  );
};

export default Cells;
