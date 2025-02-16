import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const addClassName = ({ isActive }) => (isActive ? "border-b-2 border-black" : "text-[#5f6368] hover:border-b-2 hover:bg-gray-50");
  return (
    <div className='max-w-4xl max-auto flex justify-center drop-shadow-lg'>
      <div className='w-full flex flex-row gap-14 place-content-evenly  p-4 max-w-[800px] bg-white'>
        <div>
          <NavLink className="font-bold tracking-wider" to="/">Scribbler</NavLink>
        </div>

        <NavLink to="/" className={addClassName}>Home</NavLink>
        <NavLink to="/notes" className={addClassName}>Notes</NavLink>
      </div>
    </div>

  )
}
// w-full flex flex-row gap-14 place-content-evenly shadow-lg p-4 max-w-[800px] bg-white
export default Navbar
