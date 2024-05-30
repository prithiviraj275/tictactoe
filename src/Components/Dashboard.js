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
    <div className="dashboard flex flex-row justify-center items-center font-  text-slate-50 w-full h-screen">
      <div className="w-2/4 h-full flex justify-center items-center text-5xl">
        Welcome to Tic Tac Toe
      </div>
      <div className="w-2/4 h-full flex justify-center items-center flex-col">
        <button
          className="m-4 text-3xl bg-slate-100 p-4 text-black rounded transition-all hover:text-4xl"
          onClick={() => {
            setDashData(!dashdata);
            setGameplay("player vs player");
          }}
        >
          Play with Friend
        </button>
        <button
          className="m-4 text-3xl bg-slate-100 p-4 text-black rounded transition-all hover:text-4xl"
          onClick={() => {
            // setDashData(!dashdata);
            setGameplay("player vs computer");
            handleshowpopup();
          }}
        >
          Play with Computer
        </button>
      </div>
      {showpopup && (
        <DifficultyPopup
          handleDifficulty={handleDifficulty}
          handleshowpopup={handleshowpopup}
          dashdata = {dashdata}
          setDashData = {setDashData}
        />
      )}
    </div>
  );
};

export default Dashboard;
