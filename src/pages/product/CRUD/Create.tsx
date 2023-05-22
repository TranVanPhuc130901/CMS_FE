import Loading from '@/components/base/Loading';
import { CategoryProductColumn } from '@/components/columns/CategoryProduct';
import { ProductForm } from '@/components/form/Product';
import CreateRecord from '@/components/popup/createRecord'
import { Product } from '@/interfaces/Product';
import { getCategory } from '@/sagas/getRecord/getSlice';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

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

   console.log(CategoryProductColumn);

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
        />
    </div>
  )
}

export default Create