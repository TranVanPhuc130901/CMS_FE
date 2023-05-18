import React from 'react'
import Link from 'next/link';
import NavbarList from './navbar/NavbarList';


const Navbar = () => {
  return (
    <div className='w-[150px] bg-[#242322] shadow-menu'>
        <div className=''> 
          <NavbarList/>
        </div>
    </div>
  )
}

export default Navbar