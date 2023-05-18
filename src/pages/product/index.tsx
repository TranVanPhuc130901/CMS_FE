import React, {useState, useEffect} from 'react';
import HeaderTable from '../../components/table/HeaderTable';
import TableList from '../../components/table/TableList';
import Loading from '@/components/base/Loading';


interface ProductListProps{
  data: Array<any>,
  filed: Array<any>,
  dataType: string,
  value: Array<any>
}

const ProductList: React.FC<ProductListProps> = ({data, filed, dataType}) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const filedList = ["focus","Tên sản phẩm", "Mã sản phẩm", "Danh mục sản phẩm", "Trạng thái", "Ảnh sản phẩm", "Content Sản phẩm", "Giá sản phẩm", "Giá khuyến mãi", "Chức năng"];
  const valueList = ["productName", "productCode", "categoryName", "productStatus", "productImageSlug", "productContentName", "productCost", "productPromotional"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7093/api/Product');
        const data = await response.json();
        setProductData(data);
        setLoading(false)
        console.log(data);
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  return (
    <div className='w-full pt-3 bg-[#1b1919] px-10 overflow-auto'>
      <div className=''>
        <HeaderTable name='product'/>
      </div>
      <div className='bg-[#1b1919] w-[full] h-[calc(100vh-200px)]'>
        <TableList data={productData} filed={filedList} dataType="product" valu={valueList} />
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default ProductList;