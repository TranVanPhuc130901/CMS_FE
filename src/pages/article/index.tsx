import HeaderTable from '@/components/table/HeaderTable'
import TableList from '@/components/table/TableList'
import React, { useEffect, useState } from 'react';

import CreateRecord from '@/components/popup/createRecord';
import Loading from '@/components/base/Loading';


interface ProductListProps{
    data: Array<any>,
    filed: Array<any>,
    dataType: string,
    value: Array<any>
  }

const ArticleList = () => {
    const filedArticle = ["", "Tên tin tức", "Mã tin tức", "Mô tả tin tức", "ảnh tin tức", "Người đăng", "từ khóa", "Danh mục", "Chức năng"];
    const valueArticle = ["title", "articleID", "content", "image", "author", "tagName", "categoryName"]
    const [dataArticle, setDataArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('https://localhost:7093/api/Article');
              const data = await response.json();
              setDataArticle(data);
              setLoading(false)
            } catch (error) {
              console.log(error);
              setLoading(false)
            }
          };
          fetchData();
    }, [])
    return (
      <div className='w-full pt-3 bg-[#1b1919] px-10 overflow-auto'>
            <div className=''>
                <HeaderTable name='article'/>
            </div>
            <div className='bg-[#1b1919] w-[full]'>
               <TableList data={dataArticle} filed={filedArticle} dataType='article' valu={valueArticle}/>
            </div>
           {loading && <Loading/>}
        </div>
      )
}
export default ArticleList