import React, {useEffect, useState} from 'react'
import HeaderTable from '@/components/table/HeaderTable'
import TableList from '@/components/table/TableList'

interface UserListProps{
    data: Array<any>,
    filed: Array<any>,
    dataType: string,
    value: Array<any>
  }
const UserList = () => {
    const [dataUser, setDataUser] = useState([]);
    const fieldUser = ["","Tên tài khoản", "Quyền", "Chức năng"];
    const valueUser = ["userName" , "roleName"]
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('https://localhost:7093/api/v1/User');
              const data = await response.json();
              setDataUser(data);
            } catch (error) {
              console.log(error);
            }
          };
      
          fetchData();
    }, [])
    return (
      <div className='w-full pt-3 bg-[#1b1919] px-10 overflow-auto'>
            <div className=''>
                <HeaderTable name='User'/>
            </div>
            <div className='bg-[#1b1919] w-[full]'>
               <TableList data={dataUser} filed={fieldUser} dataType='user' valu={valueUser}/>
            </div>
        </div>
      )
}

export default UserList