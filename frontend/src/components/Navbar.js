import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="home">
        <NavLink to={'/'}>Earnworm Report</NavLink>
      </div>
      <div className="othertabs">
        <NavLink to={'/'} >Home</NavLink>
        <NavLink className="pro" to={'/songs'} >All Songs</NavLink>
        <NavLink className="pro" to={'/songs/bypop'} >By Popularity</NavLink>
        <NavLink className="pro" to={'/songs/bygen'} >By Genre</NavLink>
        <NavLink className="prolast" to={'/profile'} >My Profile</NavLink>
      </div>
    </div>
  )
}
