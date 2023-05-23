import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeaderTable from '../../components/table/HeaderTable';
import TableList from '../../components/table/TableList';
import Loading from '@/components/base/Loading';
import Table from '@/components/table/Table';
import { getProduct } from '@/sagas/getRecord/getSlice';
import ProductColumns from '@/components/columns/ProductColumns';


interface ProductListProps{
  data: Array<any>,
  filed: Array<any>,
  dataType: string,
  value: Array<any>
}

const ProductList: React.FC<ProductListProps> = ({data, filed, dataType}) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);


  const dispath = useDispatch();

  // const filedList = ["focus","Tên sản phẩm", "Mã sản phẩm", "Danh mục sản phẩm", "Trạng thái", "Ảnh sản phẩm", "Content Sản phẩm", "Giá sản phẩm", "Giá khuyến mãi", "Chức năng"];
  // const valueList = ["productName", "productCode", "categoryName", "productStatus", "productImageSlug", "productContentName", "productCost", "productPromotional"]

  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      try {
        await dispath(getProduct());
        setLoading(false);
      } catch (error) {
        console.error('Error while fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [dispath]);
  
 const products = useSelector((state: any) => state.getRecord.products);

  return (
    <div className='w-full pt-3 bg-[#1b1919] px-10 overflow-auto'>
      <div className=''>
        <HeaderTable name='product'/>
      </div>
      <div className='bg-[#1b1919] overflow-auto h-[calc(100vh-200px)]'>
        <Table data={products} filed={ProductColumns}/>
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default ProductList;