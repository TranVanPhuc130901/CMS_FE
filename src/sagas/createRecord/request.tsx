import { toast } from 'react-toastify';

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