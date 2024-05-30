import React from "react";
import Game from "./Game";
import Dashboard from "./Dashboard";

const TicTacToe = ({
  gameVal,
  toggle,
  resetData,
  titleref,
  lock,
  dashdata,
  setDashData,
  player,
  setPlayer,
  toggleComputer,
  viewDashboard,
  setGameplay,
  gameplay,
  showpopup,
  handleDifficulty,
  handleshowpopup
}) => {
  return (
    <div className=" bg-gray-900 w-full h-screen flex flex-col justify-center items-center ">
      {dashdata ? (
        <Dashboard
          setDashData={setDashData}
          dashdata={dashdata}
          player={player}
          setPlayer={setPlayer}
          setGameplay = {setGameplay}
          showpopup = {showpopup}
          handleDifficulty = {handleDifficulty}
          handleshowpopup = {handleshowpopup}
        />
      ) : (
        <>
          <p
            ref={titleref}
            className="text-5xl text-white"
            style={lock ? { display: "block" } : { display: "none" }}
          >
            winner
          </p>

          <Game
            gameVal={gameVal}
            toggle={toggle}
            resetData={resetData}
            setDashData={setDashData}
            dashdata={dashdata}
            setPlayer={setPlayer}
            player={player}
            toggleComputer={toggleComputer}
            viewDashboard={viewDashboard}
            gameplay={gameplay}
          />
        </>
      )}
    </div>
  );
};

export default TicTacToe;
