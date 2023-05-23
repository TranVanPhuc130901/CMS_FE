import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/components/base/Loading';
import Table from '@/components/table/Table';
import { getProduct } from '@/sagas/getRecord/getSlice';
import ProductColumns from '@/components/columns/ProductColumns';
import HeaderTable from '@/components/table/HeaderTable';
import { requestDeleteProductId, requestGetImageByProductId } from '@/sagas/createRecord/request';


interface ProductListProps{
  data: Array<any>,
  filed: Array<any>,
  dataType: string,
  value: Array<any>
}

const ProductList: React.FC<ProductListProps> = ({data, filed, dataType}) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageDelete, setImageDelete] = useState('');


  const dispath = useDispatch();
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

  const handleDeleteProduct = async (recordId: any) => {
    try {
      await requestDeleteProductId(recordId);
      // Gọi lại API hoặc cập nhật lại danh sách sản phẩm nếu cần
      const deleteImagePromise = await fetch(`/api/delete-image?filename=${imageDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!deleteImagePromise.ok) {
        console.log('Xóa ảnh thất bại');
        // Xử lý khi xóa ảnh thất bại
      } else {
        console.log('Xóa ảnh thành công');
        // Xử lý khi xóa ảnh thành công
      }
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu cần thiết
    }
  };
  
  // Lấy hình ảnh của sản phẩm dựa trên recordId
  const handleGetProductImage = async (recordId: any) => {
    try {
      const imageData = await requestGetImageByProductId(recordId);
      const imageSlugs = imageData.map((image: any) => image.productImageSlug);
      setImageDelete(imageSlugs.join(', '));

      console.log(imageDelete);
      
      // Xử lý dữ liệu hình ảnh nếu cần thiết
    } catch (error) {
      console.log(error);
      // Xử lý lỗi nếu cần thiết
    }
  };


  
 const products = useSelector((state: any) => state.getRecord.products);

  return (
    <div className='w-full pt-3 bg-[#1b1919] px-10 overflow-auto'>
      <div className=''>
        <HeaderTable name='product'/>
      </div>
      <div className='bg-[#1b1919] overflow-auto h-[calc(100vh-200px)]'>
        <Table data={products} filed={ProductColumns} name='product' imageDelete={handleGetProductImage} itemDelete={handleDeleteProduct}/>
      </div>
      {loading && <Loading/>}
    </div>
  );
};

export default ProductList;