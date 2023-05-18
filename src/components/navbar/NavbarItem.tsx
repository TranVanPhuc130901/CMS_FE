import React from 'react'
import Image from 'next/image';
import img from '../../../public/image/balloon.jpg'


interface NavbarItemProps {
    name: string;
    icon: string
  }

const NavbarItem = (props: NavbarItemProps) => {
    const {name, icon} = props
  return (
        <div className='flex flex-col justify-center items-center gap-3 hover:bg-gray-400 p-3'>
            <div>
                <Image src={icon} width={40} height={40} alt='img'/>
            </div>
            <div>
                <div className='text-white'>{name}</div>
            </div>
        </div>
  )
}

export default NavbarItem