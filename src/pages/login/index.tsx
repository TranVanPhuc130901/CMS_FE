import React from 'react';
import Image from 'next/image';

import Bg from '../../public/image/balloon-lg.jpg';
import magic from '../../public/image/balloon.jpg';
import Link from 'next/link';

const Login = () => {
  return (
    <div>
        <form className='bgImage relative flex items-center justify-center'>
            <div className='flex'>
                <div className='w-[300px] h-[300px] bg-black flex items-center justify-center text-white flex-col gap-4 p-4'>
                    <div>CMS Login</div>
                    <div className='flex flex-col gap-4 w-full text-black'>
                        <div className='w-full'>
                            <label htmlFor=""></label>
                            <input type="text" className='w-full p-2 outline-none' placeholder='Username...' required/>
                        </div>
                        <div className='w-full'>
                            <label htmlFor=""></label>
                            <input type="password" className='w-full p-2 outline-none' placeholder='Password...' required/>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <Link href={'/'}>forgot Password</Link>
                        <button type='submit' className='bg-[#913a47] px-6 py-2 rounded-[50px]'>Login</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login