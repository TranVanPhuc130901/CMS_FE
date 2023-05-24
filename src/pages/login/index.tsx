import React, {useState, useCallback, useEffect} from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';

import Bg from '../../public/image/balloon-lg.jpg';
import magic from '../../public/image/balloon.jpg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { requestLogin, saveToken } from '@/sagas/User/request';
import { setFullName, setToken } from '@/redux-thunk/userSlice';


const Login = () => {

const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');
const router = useRouter()
const dispatch = useDispatch();
const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }; 

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await requestLogin(userName, password);
          if (response) {
            console.log(response.message);
            console.log(response);
            dispatch(setFullName(response.fullName));
            sessionStorage.setItem('token', response.token);
            dispatch(setToken(response.token))
            await saveToken(response.token);
            // Chuyển hướng đến trang quản trị
           
            router.push('/product');
          } else {
            console.log(response.message);
            console.log(response);
          }
        } catch (error) {
          console.error('Lỗi', error);
        }
        console.log('name:', userName, 'pass:', password);
  };
      

  return (
    <div>
        <form className='bgImage relative flex items-center justify-center'>
            <div className='flex'>
                <div className='w-[300px] h-[300px] bg-black flex items-center justify-center text-white flex-col gap-4 p-4'>
                    <div>CMS Login</div>
                    <div className='flex flex-col gap-4 w-full text-black'>
                        <div className='w-full'>
                            <label htmlFor=""></label>
                            <input type="text" className='w-full p-2 outline-none' placeholder='Username...' onChange={handleUserName} required/>
                        </div>
                        <div className='w-full'>
                            <label htmlFor=""></label>
                            <input type="password" className='w-full p-2 outline-none' placeholder='Password...' onChange={handlePassword} required/>
                        </div>
                    </div>
                    <div className='flex justify-between items-center w-full'>
                        <Link href={'/'}>forgot Password</Link>
                        <button type='submit' className='bg-[#913a47] px-6 py-2 rounded-[50px]' onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login