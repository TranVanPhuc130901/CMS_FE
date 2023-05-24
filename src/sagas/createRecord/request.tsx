import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

// let token = useSelector((state: any) => state.userLogin.token);

export async function requestAddProduct(formData:any) {
  try {
    const {
      productCode,
      productName,
      productDescription,
      productStatus,
      productImageSlug,
      productCost,
      productPromotional,
      productContentName,
      productMetaDataTitle,
      productMetadataDescrition,
      categoryId
    } = formData;

    const apiUrl = 'https://localhost:7093/api/Product';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productCode,
        productName,
        productDescription,
        productStatus: parseInt(productStatus),
        productImageSlug,
        productCost,
        productPromotional,
        productContentName,
        productMetaDataTitle,
        productMetadataDescrition,
        categoryId
      }),
    });

      if (response.ok) {
        const data = await response.json();
        console.log('Thêm dữ liệu thành công');
        return data;
      } else {
        // Xử lý phản hồi lỗi
        const errorText = await response.text();
        console.error('Lỗi khi thêm dữ liệu:', errorText);
        throw new Error('Lỗi khi thêm dữ liệu');
      }
    } catch (error) {
      // Xử lý lỗi
      console.error('Lỗi khi thêm dữ liệu:', error);
      throw error;
    }
  }

  export async function requestUpdateProduct(formData:any, recordId: any) {
    try {
      const {
        productID,
        productCode,
        productName,
        productDescription,
        productStatus,
        productImageSlug,
        productCost,
        productPromotional,
        productContentName,
        productMetaDataTitle,
        productMetadataDescrition,
        categoryId
      } = formData;
  
      const apiUrl = `https://localhost:7093/api/Product/${recordId}`;
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productID,
          productCode,
          productName,
          productDescription,
          productStatus: parseInt(productStatus),
          productImageSlug,
          productCost,
          productPromotional,
          productContentName,
          productMetaDataTitle,
          productMetadataDescrition,
          categoryId
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Thêm dữ liệu thành công');
        return data;
      } else {
        // Xử lý phản hồi lỗi
        const errorText = await response.text();
        console.error('Lỗi khi thêm dữ liệu:', errorText);
        throw new Error('Lỗi khi thêm dữ liệu');
      }
    } catch (error) {
      // Xử lý lỗi
      console.error('Lỗi khi thêm dữ liệu:', error);
      throw error;
    }
    }

    export async function requestGetProductId(recordId: any) {
      try {
        const response = await fetch(`https://localhost:7093/api/Product/${recordId}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    

    export async function requestDeleteProductId(recordId: any){
      try {
        const deleteDataPromise = fetch(`https://localhost:7093/api/product/${recordId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

export async function requestGetImageByProductId(recordId: any) {
 try {
  const imageProduct = await fetch(`https://localhost:7093/api/product/GetImage?recordId=${recordId}`)
  const data = await imageProduct.json();
  return data;
  console.log(data);
  
 } catch (error) {
  console.log(error);
  throw error;
 }
}
