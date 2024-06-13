import React from "react";
import DifficultyPopup from "./DifficultyPopup";

const Dashboard = ({
  setDashData,
  dashdata,
  setGameplay,
  showpopup,
  handleDifficulty,
  handleshowpopup,
}) => {
  return (
    <div className="dashboard flex justify-center items-center  text-slate-50 w-full h-screen max-[300px]:flex-col">
      <div className="w-2/4 h-full flex justify-center items-center flex-wrap text-5xl max-[300px]:text-2xl max-[300px]:w-full">
        <span className="m-5 flex-wrap max-[300px]:m-2"> Welcome to Tic Tac Toe </span>
      </div>
      <div className="w-2/4 h-full flex justify-center items-center flex-col max-[300px]:w-full">
        <button
          className="m-4 text-xl bg-slate-100 p-4 text-black rounded transition-all hover:text-2xl"
          onClick={() => {
            setDashData(!dashdata);
            setGameplay("player vs player");
          }}
        >
          Play with Friend
        </button>
        <button
          className="m-4 text-xl bg-slate-100 p-4 text-black rounded transition-all hover:text-2xl"
          onClick={() => {
            // setDashData(!dashdata);
            setGameplay("player vs computer");
            handleshowpopup();
          }}
        >
          Play with Computer
        </button>
        <div>
        {showpopup && (
          <DifficultyPopup
            handleDifficulty={handleDifficulty}
            handleshowpopup={handleshowpopup}
            dashdata = {dashdata}
            setDashData = {setDashData}
          />
        )}
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
