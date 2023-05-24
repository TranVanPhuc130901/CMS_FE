import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

interface PropsHeaderTable {
    name: string
}


const HeaderTable = (props: PropsHeaderTable) => {
    const {name} = props;
    
  return (
    <div className='flex justify-between items-start w-full px-3 h-[100px] pt-3 mb-3 border-b-[1px] border-[#fff]'>
        <div className='flex items-end gap-2 text-[#8f8f8f]'>
            <div className='text-2xl'>{name}</div>
            <div>Data</div>
        </div>
        <div className='flex flex-col gap-1 items-center'>
            <div className='flex gap-1'>
                <Link href={`/${name}/CRUD/Create`}>
                <button className='bg-[#913a47] border-[#913a47] text-white rounded-[50px] py-2 px-10 '>Add New</button>
                </Link>
                <button className='bg-[#913a47] border-[#913a47] text-white rounded-[50px] px-4'>
                    <input className='outline-none' type="checkbox" name="" id="" />
                </button>
            </div>
            <div className='flex gap-x-1'>
                <div className='flex items-center'>
                    <span className='text-[#8f8f8f] text-xs'>Hiển thị 1- 10 Trong 210 Sản phẩm</span>
                </div>
                <div>
                    <button className='border-[1px] border-[#8f8f8f] px-5 py-1 text-xs rounded-xl text-[#8f8f8f] 
                    hover:bg-[#913a47] hover:text-white hover:border-[#913a47]'>20</button>
                        <div className='hidden'>
                            <div>10</div>
                            <div>20</div>
                            <div>30</div>
                            <div>40</div>
                            <div>50</div>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeaderTable