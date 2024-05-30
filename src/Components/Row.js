import React from "react";
import Cells from "./Cells";

const Row = ({row,rowIndex,toggle,gameplay,toggleComputer}) => {
  return (
    <div className="row flex gap-2">
    
    {
      row.map((cells,index)=>(
        <Cells  key={index} rowIndex ={rowIndex} cellIndex = {index} cells={cells} toggle={toggle} gameplay={gameplay} toggleComputer={toggleComputer}/>
        
      ))

    }
      
    </div>
  );
};

export default Row;
