import { toast } from 'react-toastify';

export async function requestAddProduct(formData:any, selectedImage: any) {
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
      console.log('Thêm dữ liệu thành công:', data);
    } else {
      // Xử lý phản hồi lỗi
      throw new Error('Lỗi khi thêm dữ liệu');
    }
  }