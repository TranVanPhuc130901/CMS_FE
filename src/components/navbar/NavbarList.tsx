import React from 'react'
import NavbarItem from './NavbarItem';
import Link from 'next/link';

const productImage = '/icon/product.svg';
const articleImage = '/icon/article.svg';
const userImage = '/icon/user.svg'


const NavbarList = () => {
    
  return (
    <div className='flex flex-col gap-4'>
       <Link href='/product'>
            <NavbarItem name='Product' icon={productImage}/>
       </Link>
       <Link href='/article'>
            <NavbarItem name='Article' icon={articleImage}/>
       </Link>
        <Link href='/user'>
            <NavbarItem name='User' icon={userImage}/>
        </Link>
    </div>
  )
}

export default NavbarList