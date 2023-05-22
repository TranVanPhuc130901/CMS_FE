import React, {useEffect, useState} from 'react'
import HeaderTable from '@/components/table/HeaderTable'
import TableList from '@/components/table/TableList'

import { useDispatch, useSelector } from 'react-redux'
import { getUser, setLoading } from '@/sagas/getRecord/getSlice'
import { UserColumn } from '@/components/columns/UserColumn'
import Loading from '@/components/base/Loading'
import Table from '@/components/table/Table'

interface UserListProps{
    data: Array<any>,
    filed: Array<any>,
    dataType: string,
    value: Array<any>
  }
const UserList = () => {
    const [dataUser, setDataUser] = useState([]);
    const [loading, setLoading] = useState(true);

const dispath = useDispatch();

    useEffect(() => {
      setLoading(true);
    
      const fetchData = async () => {
        try {
          await dispath(getUser());
          setLoading(false);
        } catch (error) {
          console.error('Error while fetching data:', error);
          setLoading(false);
        }
      };
    
      fetchData();
    }, [dispath]);
    
  
   const user = useSelector((state: any) => state.getRecord.user);
  
  console.log('file', UserColumn);
    return (
      <div className='w-full pt-3 bg-[#1b1919] px-10 overflow-auto'>
      <div className=''>
        <HeaderTable name='product'/>
      </div>
      <div className='bg-[#1b1919] overflow-auto h-[calc(100vh-200px)]'>
        <Table data={user} filed={UserColumn}/>
      </div>
      {loading && <Loading/>}
    </div>
    );
}

export default UserList