import React, { useState } from 'react'

const Navbar = () => {

  return (
    <nav className='md:flex justify-around bg-[#7340A0] p-3 items-center'>
      <div className="appName font-bold text-2xl md:text-left text-center my-2 md:my-0">TaskNest</div>
      <ul className='flex gap-14 items-center md:justify-normal justify-around'>
        <li className='hover:underline cursor-pointer hover:text-lg transition-all'>Home</li>
        <li className='hover:underline cursor-pointer hover:text-lg transition-all'>Code Base</li>
      </ul>
    </nav>
  )
}

export default Navbar
