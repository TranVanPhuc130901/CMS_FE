import CreateRecord from '@/components/popup/createRecord'
import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import UpdateRecord from '@/components/popup/UpdateRecord'
import { ProductForm } from '@/components/form/Product'
import { useSelector } from 'react-redux'
import { requestGetProductId, requestUpdateProduct } from '@/sagas/createRecord/request'
import { toast } from 'react-toastify'
import { CategoryProductColumn } from '@/components/columns/CategoryProduct'


interface FormDatas {
   [key: string]: any
 }
 
const Update = () => {
   const [productData, setProductData] = useState<FormDatas>({
      productID: 0,
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
    });
 
      const router = useRouter();
      const id = router.query;
      const parseId = id.id
       const updateProduct = async (formData: any, selectedImage: any) => {
         try {
            const data = await requestUpdateProduct(formData, parseId);
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

       const dataProduct = (data:any ) : FormDatas => ({
         productID: data.productID || 0,
         productCode: data.productCode || '',
         productName: data.productName || '',
         productDescription: data.productDescription || '',
         productStatus: data.productStatus || 0,
         productImageSlug: data.productImageSlug || '',
         productCost: data.productCost || 0,
         productPromotional: data.productPromotional || 0,
         productContentName: data.productContentName || '',
         productMetaDataTitle: data.productMetaDataTitle || '',
         productMetadataDescrition: data.productMetadataDescrition || '',
         categoryId: data.categoryId || '',
      })

       useEffect(() => {
         const fetchData = async () => {
           try {
             const data = await requestGetProductId(parseId);
             const formattedData = dataProduct(data);
             setProductData(formattedData);
           } catch (error) {
             console.log(error);
           }
         };
         fetchData();
       }, [parseId]);
              

    const category = useSelector((state: any) => state.getRecord.categories);

  return (
    <div>
        <UpdateRecord dataTypes='product' fileds={ProductForm} dataTitle='Sản Phẩm' dataCombobox={category}  columnCombobox={CategoryProductColumn} dataRecordId={productData} api={updateProduct} />
    </div>
  )
}

export default Update