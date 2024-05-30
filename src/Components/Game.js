import React from "react";
import Row from "./Row";

const Game = ({gameVal,toggle,resetData,viewDashboard,gameplay,toggleComputer}) => {
  return (
    <div className="gamecontainer flex flex-col justify-center items-center gap-2">
      <div className="Heading font-semibold text-slate-200 text-5xl m-5" > Tic Tac Toe</div>
      {
        gameVal.map((row,index)=> ( 
          <Row row={row} rowIndex = {index} key={index} toggle={toggle} gameplay ={gameplay} toggleComputer={toggleComputer}/>
        ))
      }
      
      <div>         
        <button className="resetbutton w-24 h-12 m-5 rounded-lg bg-white text-xl" onClick={()=> resetData()}>Reset</button>
        <button className="resetbutton p-2 h-12 m-5 rounded-lg bg-white text-xl" onClick={()=> viewDashboard() }>Go to dashboard</button>
      </div>
    </div>
  );
};

export default Game;
