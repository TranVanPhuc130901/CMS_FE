import Loading from '@/components/base/Loading';
import { CategoryProductColumn } from '@/components/columns/CategoryProduct';
import { ProductForm } from '@/components/form/Product';
import CreateRecord from '@/components/popup/createRecord'
import { Product } from '@/interfaces/Product';
import { requestAddProduct } from '@/sagas/createRecord/request';
import { getCategory } from '@/sagas/getRecord/getSlice';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface  createPropsProduct{
    dataTypes: string,
    fileds: Array<any>,
    dataTitle: string,
    dataCombobox: Array<any>,
    loading: boolean
}

const Create = () => {
    const [dataCombo, setDataCombo] = useState([]);

    const dispatch = useDispatch();


    const product: Product = {
      productCode: '',
      productName: '',
      productDescription: '',
      productStatus: 0,
      productImageSlug: '',
      productCost: 0,
      productPromotional: 0,
      productContentName: '',
      productMetaDataTitle: '',
      productMetadataDescrition: '',
      categoryId: '',
    }

    useEffect(() => {
        dispatch(getCategory());
    },[dispatch]);


    const createProduct = async (formData: any, selectedImage: any) => {
      try {
        const data = await requestAddProduct(formData);
        if (selectedImage) {
          const uploadFormData = new FormData();
          uploadFormData.append('image', selectedImage);
    
          const uploadResponse = await fetch('/api/upload-image', {
            method: 'POST',
            body: uploadFormData,
          });
    
          if (uploadResponse.ok) {
            console.log('Lưu ảnh thành công');
            // Tiếp tục thực hiện các bước khác sau khi lưu ảnh thành công
          } else {
            throw new Error('Lỗi khi lưu ảnh');
          }
        }
        // Xử lý phản hồi thành công
        toast.success('Thêm dữ liệu thành công');
      } catch (error) {
        toast.error('Thêm dữ liệu thất bại');
        console.error('Lỗi khi thêm dữ liệu:', error);
      }
    }

    const category = useSelector((state: any) => state.getRecord.categories);
  return (
    <div>
        <CreateRecord 
            dataTypes='product' 
            fileds={ProductForm} 
            dataTitle='Sản Phẩm' 
            dataCombobox={category}
            columnCombobox={CategoryProductColumn}
            valueAddRecord={product}
            api={createProduct}
        />
    </div>
  )
}

export default Create