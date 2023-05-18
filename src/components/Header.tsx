import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Search from '../../assets/icon/search.svg';
import Menu from '../../assets/icon/icons8-menu.svg';
import FullScreen from '../../assets/icon/fullscreen.svg';
import ActualScreen from '../../assets/icon/actureScreen.svg';
import avatar from '../../assets/image/avatar.jpg';

const path = require('path');
const imagePath = path.resolve(__dirname, 'my-app', 'assets', 'image');

const Header = () => {
  const [screen, setScreen] = useState<boolean>(true);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    if (isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [isFullScreen]);

  const tongleFullScreen = () => {
    setScreen(!screen);
    setIsFullScreen(!isFullScreen)
  }

  return (
    <div className='flex justify-between items-center py-4 mx-16 h-[78px]'>
        <div className='flex items-center gap-x-3'>
          <div className='w-[110px] flex gap-x-1 justify-center items-center cursor-pointer' > 
                  <svg className='h-3 fill-[#8f8f8f]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 17">
                      <rect x="0.48" y="0.5" width="7" height="1"></rect>
                      <rect x="0.48" y="7.5" width="7" height="1"></rect>
                      <rect x="0.48" y="15.5" width="7" height="1"></rect>
                  </svg>
                  <svg className='h-3 fill-[#707070]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17">
                      <rect x="1.56" y="0.5" width="16" height="1"></rect>
                      <rect x="1.56" y="7.5" width="16" height="1"></rect>
                      <rect x="1.56" y="15.5" width="16" height="1"></rect>
                  </svg>
          </div>
          <div className='flex bg-[#1b1a19] w-[230px] rounded-2xl text-[#8f8f8f] py-2 px-4'>
            <input className='bg-transparent border-none outline-none' type="text" placeholder='Search...' />
            <Image src={Search} alt='search-icon' className='cursor-pointer'/>
          </div>
          <div className='border-[1px] border-[#ad7140] text-[#ad7140] rounded-[50px] px-4 py-1'>
            <button>Buy</button>
          </div>
        </div>
        <div className='flex'>
          <div className='text-white'>CMS</div>
        </div>
        <div className='flex items-center gap-x-4'>
          <div className='relative w-[42px] h-[23px] flex items-center'>
            <button className="w-full h-full border-[1px] border-[#913a47] rounded-[76px]" ></button>
            <span className='w-[14px] h-[14px] bg-[#913a47] absolute block left-1 rounded-full'></span>
          </div>
            <div className='cursor-pointer'>
              <Image src={Menu} alt='menu' className='w-10 h-10'/>
            </div>
            <div onClick={tongleFullScreen}>
              {screen ? (
                <Image src={FullScreen} alt='fullScreen' className='w-8 h-10 cursor-pointer'/>
              ):
               (
                <Image src={ActualScreen} alt='actualScreen' className='w-8 h-10 cursor-pointer'/>
               )}
            </div>
            <div className='flex gap-x-2 items-center cursor-pointer'>
              <div className='text-white'>Alex</div>
              <Image className='w-10 h10 rounded-full' src={avatar} alt="avatar" width={100} height={100} />
            </div>
        </div>
    </div>
  )
}

export default Header