import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image';
import TheadTable from './TheadTable'
import Notification from '../popup/Notification';


import close from '../../../public/icon/close.svg'
import { Fragment } from '@tiptap/pm/model';
import { toast } from 'react-toastify';

interface ItemTableProps {
    data: any[]; // Add the 'data' property
    dataType: string;
    valu: any[]
  }
  
  const ItemTable: React.FC<ItemTableProps> = ({ data, dataType, valu }) => {
  const [showNotification, setShowNotification] = useState(false);
  const [idRecordDelete, setidRecordDelete] = useState('');
  const [imageDelete, setImageDelete] = useState('');

useEffect(() => {
  if (idRecordDelete) {
    // Gọi API để lấy tất cả các ảnh của product
    var apiUrl = `https://localhost:7093/api/${dataType}/GetImage?recordId=${idRecordDelete}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Lấy giá trị productImageSlug từ mảng ảnh và cập nhật imageDelete
        const imageSlugs = data.map((image: any) => image.productImageSlug);
        setImageDelete(imageSlugs.join(', '));
      })
      .catch(error => {
        console.error('Lỗi khi lấy dữ liệu ảnh:', error);
      });
  } else {
    setImageDelete('');
  }
}, [idRecordDelete, dataType]);

console.log(imageDelete);

const handleDelete = async (productId: any) => {
  setidRecordDelete(productId);
  setShowNotification(true);
  console.log(productId);
}


  const cancelDelete = () => {
    setShowNotification(false)
  }

  const submitDelete = async () => {
    try {
      const deleteImagePromise = fetch(`/api/delete-image?filename=${imageDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const deleteDataPromise = fetch(`https://localhost:7093/api/${dataType}/${idRecordDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      const [deleteImageResponse, deleteDataResponse] = await Promise.all([deleteImagePromise, deleteDataPromise]);
    
      if (!deleteImageResponse.ok) {
        console.log('Xóa ảnh thất bại');
        // Xử lý khi xóa ảnh thất bại
      } else {
        console.log('Xóa ảnh thành công');
        // Xử lý khi xóa ảnh thành công
      }
    
      if (deleteDataResponse.ok) {
        toast.success('Xóa dữ liệu thành công')
        console.log('Xóa dữ liệu thành công');
        setShowNotification(false);
      } else {
        toast.error('Xóa dữ liệu thất bại');
        console.log('Xóa dữ liệu thất bại');
      }
    } catch (error) {
      toast.error('Xóa dữ liệu thất bại');
      console.log('Xóa thất bại', error);
    }
    
  }

    return (
      <React.Fragment>
        {data.map((item: any, index: number) => (
          <tr className='bg-[#222020] shadow-tb flex items-center text-[#8f8f8f] relative' key={index}>
           <td className="py-4 whitespace-nowrap w-[250px] text-center sticky left-0 z-30 top-0">
            <input type="checkbox" name="" id="" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
          </td>
            {Array.isArray(valu) ? (
            valu.map((field: any, index: number) => (
                <td key={index} className="w-[250px] whitespace-nowrap text-center">
                {(() => {
                    switch (dataType) {
                      case 'product':
                        if (field === 'productImageSlug') {
                          return (
                            <Image src={`/images/${item[field]}`} alt="Product image" width={100} height={100} className='my-0 mx-auto'/>
                          );
                        } 
                        else if(field === 'productStatus'){
                          const status = item[field]
                          if(status === 0){
                            return (
                              <div className='bg-red-800 rounded-[40px]' >
                                <span>Chưa kích hoạt</span>
                              </div>
                            );
                          } else if(status === 1) {
                            return (
                              <div className='bg-blue-600 rounded-[40px]'>
                                <span>Đã kích hoạt</span>
                              </div>
                            );
                          } else {
                            return (
                              <div className='bg-yellow-500-800 rounded-[40px]'>
                                <span>Chờ xử lý</span>
                              </div>
                            );
                          }
                          
                        } else {
                          return item[field];
                        }
                    case 'article':
                        return item[field];
                    case 'user':
                        return item[field];
                    default:
                        return '';
                    }
                })()}
                </td>
            ))
            ) : (
            <td className="px-6 py-4 whitespace-nowrap">Giá trị không hợp lệ.</td>
            )}

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium w-[250px] text-center sticky right-0 z-10">
              <Link href={`/${dataType}/CRUD/Update/${item.productID}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Sửa</Link>
              <Link href={`/${dataType}/CRUD/Delete/${item.productID}`} onClick={(e) => {e.preventDefault() ; handleDelete(item.productID)
              }} className="text-red-600 hover:text-red-900">Xóa</Link>
            </td>
          </tr>
        ))}
        {showNotification && (
       <React.Fragment>
        <tbody className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)]'>
          <div className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)]'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[400px] p-6 flex flex-col gap-y-6'>
            <div className='flex justify-between items-center'>
                <div className='text-black text-[20px] font-bold'>Bạn có muốn xóa</div>
                <div className='cursor-pointer' onClick={cancelDelete}><Image src={close} alt='close'/></div>
            </div>
            <div>Dữ liệu bạn vừa chọn sẽ bị xóa</div>
            <div className='flex flex-row-reverse gap-x-2'>
                <button className='w-[80px] py-[9px] bg-[#DE3617] text-white rounded-[3px]' onClick={submitDelete}>Xóa</button>
                <button className='w-[80px] py-[9px] border-[1px] border-[#E0E0E0] rounded-[3px]' onClick={cancelDelete}>Hủy bỏ</button>
            </div>
            </div>
          </div> 
       </tbody>
       </React.Fragment>
        )
      }
      </React.Fragment>
    );
  };
  
  export default ItemTable
  


