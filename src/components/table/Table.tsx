import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import close from '../../../public/icon/close.svg'

interface tableProps {
    data: Array<any>;
    filed: Array<any>;
    name: string,
    imageDelete: any,
    itemDelete: any
}

const Table: React.FC<tableProps> = ({data, filed, name,imageDelete, itemDelete }) => {
    const [showNotification, setShowNotification] = useState(false);
    const [idRecordDelete, setidRecordDelete] = useState('');

    const handleDelete = async (productId: any) => {
        setidRecordDelete(productId);
        setShowNotification(true);
        console.log(productId);
      }

      const cancelDelete = () => {
        setShowNotification(false)
      }

      const submitDelete = async () => {
        // imageDelete(idRecordDelete);
        itemDelete(idRecordDelete);
        setShowNotification(false)
      }

  return (
     <React.Fragment>
        <table className='overflow-scroll w-[100%]'>
            <thead className=''> 
                <tr className='text-white flex justify-between mb-2'>
                    {filed.map((col) => (
                        !col.thDisplay && (
                        <th className='w-[250px] lex justify-center items-center' key={col.id}>{col.name}</th>
                    )))}
                </tr>
            </thead>
            <tbody className='flex flex-col gap-y-3'>
            {data.map((item, index) => (
                <tr className='text-white flex justify-between bg-[#222020] shadow-tb h-[100px] rounded-[20px]' key={index}>
                    <td className='text-white w-[250px] flex items-center justify-center' > 
                        <input type="checkbox" />
                    </td> 
                    {filed.map((col: any) => (
                            col.display && (
                                <td className='text-white w-[250px] flex justify-center items-center' key={col.id}>
                                {col.label === 'productImageSlug' ? (
                                    <Image src={`/images/${item[col.label]}`} alt="Product image" width={100} height={100} className='mx-auto py-2'/>
                                ) : col.label === 'productStatus' ? (
                                    <div className={item[col.label] === 0 ? 'bg-red-800 rounded-[40px]' : item[col.label] === 1 ? 'bg-blue-600 rounded-[40px]' : 'bg-yellow-500-800 rounded-[40px]'}>
                                    <span className='block px-3 py-1'>
                                        {item[col.label] === 0 ? 'Chưa kích hoạt' : item[col.label] === 1 ? 'Đã kích hoạt' : 'Chờ xử lý'}
                                    </span>
                                    </div>
                                ) : (
                                    item[col.label]
                                )}
                                </td>
                            )
                            ))}
                    {filed.map((i: any,index) => (
                        i.note && (
                    <td className='w-[250px] flex items-center justify-center gap-x-4' key={index}>
                        <Link href={`/${name}/CRUD/Delete/${item[i.label]}`} onClick={(e) => {e.preventDefault() ; handleDelete(item[i.label])
                    }} className='text-red-600'>Xóa</Link>
                        <Link href={`/${name}/CRUD/Update/${item[i.label]}`} className='text-blue-600'>Sửa</Link>
                    </td>)
                    ))}
                </tr>
                ))}
            </tbody>
   </table>
   {showNotification && (
        <React.Fragment>
         <div className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)]'>
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
        </div>
        </React.Fragment>
         )}
     </React.Fragment>
   
  )
}



export default Table