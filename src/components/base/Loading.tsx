import React from 'react';
import Image from 'next/image';

import loading from '../../../public/icon/loading.svg'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)]'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 loading'>
            <Image src={loading} alt='Loading' width={36} height={36}/>
        </div>
    </div>
  )
}

export default Loading