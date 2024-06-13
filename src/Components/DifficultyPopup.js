import React from 'react'
import { MdOutlineClose } from "react-icons/md";

const DifficultyPopup = ({handleshowpopup,handleDifficulty,setDashData,dashdata}) => {
  return (
    <div className='popupcontainer  w-[80%]  bottom-20 flex justify-evenly items-center h-28 '>
        <button className='m-4 text-3xl bg-slate-100 p-4 text-black rounded transition-all hover:text-4xl' onClick={(e) =>{ handleDifficulty(e); setDashData(!dashdata)}} >Easy </button>
        <button className='m-4 text-3xl bg-slate-100 p-4 text-black rounded transition-all hover:text-4xl' onClick={(e) =>{ handleDifficulty(e); setDashData(!dashdata)} } >Medium</button>
        <button className='m-4 text-3xl bg-slate-100 p-4 text-black rounded transition-all hover:text-4xl' onClick={(e) =>{ handleDifficulty(e); setDashData(!dashdata)}} >Hard</button>
        <button><MdOutlineClose size={30} onClick={()=>handleshowpopup()} /></button>

    </div>
  )
}

export default DifficultyPopup