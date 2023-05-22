import HeaderTable from '@/components/table/HeaderTable'
import TableList from '@/components/table/TableList'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateRecord from '@/components/popup/createRecord';
import Loading from '@/components/base/Loading';
import { getArticle } from '@/sagas/getRecord/getSlice';
import Table from '@/components/table/Table';
import { ArticleColumn } from '@/components/columns/ArticleColumn';


interface ProductListProps{
    data: Array<any>,
    filed: Array<any>,
    dataType: string,
    value: Array<any>
  }

const ArticleList = () => {
    const [dataArticle, setDataArticle] = useState([]);
    const [loading, setLoading] = useState(true);

      const dispatch = useDispatch();

    useEffect(() => {
      setLoading(true);
    
      const fetchData = async () => {
        try {
          await dispatch(getArticle());
          setLoading(false);
        } catch (error) {
          console.error('Error while fetching data:', error);
          setLoading(false);
        }
      };
    
      fetchData();
    }, [dispatch]);
    
  
   const article = useSelector((state: any) => state.getRecord.article);
   console.log(article);
   
  
  console.log('file', ArticleColumn);
    return (
      <div className='w-full pt-3 bg-[#1b1919] px-10 overflow-auto'>
      <div className=''>
        <HeaderTable name='product'/>
      </div>
      <div className='bg-[#1b1919] overflow-auto h-[calc(100vh-200px)]'>
        <Table data={article} filed={ArticleColumn}/>
      </div>
      {loading && <Loading/>}
    </div>
      )
}
export default ArticleList