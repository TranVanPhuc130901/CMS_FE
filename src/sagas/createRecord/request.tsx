import { toast } from 'react-toastify';

export async function requestAddProduct(formData:any) {
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
        productStatus,
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
      return data;
    } else {
      // Xử lý phản hồi lỗi
      throw new Error('Lỗi khi thêm dữ liệu');
    }
  }