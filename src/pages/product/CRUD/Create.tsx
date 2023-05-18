import Loading from '@/components/base/Loading';
import CreateRecord from '@/components/popup/createRecord'
import React, { useEffect, useState } from 'react'

interface  createPropsProduct{
    dataTypes: string,
    fileds: Array<any>,
    dataTitle: string,
    dataCombobox: Array<any>,
    loading: boolean
}

const Create = () => {
    const [dataCombo, setDataCombo] = useState([]);
    const [loadingCreate, setLoadingCreate] = useState(false);
    useEffect(() => {
        const  fetchData = async () => {
           try {
            const reponse = await fetch('https://localhost:7093/api/Category');
            const data = await reponse.json();
            setDataCombo(data)
            console.log(data);
           } catch (error) {
            console.log(error);
           }
        }
        fetchData();
    },[])
    const filedproduct = [
        {
            id: 1,
           title: "Mã sản phẩm",
           type: 'text',
           name: 'productCode'
        },
        {
            id: 2,
            title: "Tên sản phẩm",
            type: 'text',
            name: 'productName'
         },
       
         {
            id: 3,
            title: "Ảnh đại diện sản phẩm",
            image: true,
            name: 'productImageSlug'
         },
         {
            id: 4,
            title: "Tiêu đề sản phẩm(SEO)",
            type: 'text',
            name: 'productMetaDataTitle'
         },
         {
            id: 5,
            title: "Mô tả sản phẩm(SEO)",
            type: 'text',
            name: 'productMetadataDescrition'
         },
         {
            id: 6,
            title: "Giá sản phẩm",
            type: 'text',
            name: 'productCost'
         },
         {
            id: 7,
            title: "Giá khuyến mãi sản phẩm",
            type: 'text',
            name: 'productPromotional'
         },
         {
            id: 8,
            title: "Danh mục sản phẩm",
            combobox: true,
            name: 'categoryId'
         },
         {
            id: 9,
            title: 'Content sản phẩm',
            name: 'productContentName'
         },
         {
            id: 10,
            title: 'Trạng thái',
            name: 'productStatus',
            animation: true
         }
         ,
         {
            id: 11,
            title: "Chi tiết sản phẩm",
            type: 'text',
            textEditor: true,
            name: 'productDescription'
         },
        ]
  return (
    <div>
        <CreateRecord 
        dataTypes='product' 
        fileds={filedproduct} 
        dataTitle='Sản Phẩm' 
        dataCombobox={dataCombo} 
        loadingCreate={loadingCreate}
        setLoadingCreate={setLoadingCreate}
        />
        {loadingCreate && <Loading/>}
    </div>
  )
}

export default Create