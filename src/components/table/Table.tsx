import Image from 'next/image';
import React from 'react'

interface tableProps {
    data: Array<any>;
    filed: Array<any>
}

const Table: React.FC<tableProps> = ({data, filed}) => {
    
  return (
   <table className='overflow-scroll w-[100%]'>
    <thead>
        <tr className='text-white flex justify-between'>

            {filed.map((col) => (
                <th className='w-[250px]' key={col.id}>{col.name}</th>
            ))}
        </tr>
    </thead>
    <tbody>
    {data.map((item, index) => (
          <tr className='text-white flex justify-between' key={index}>
            <td className='text-white w-[250px] flex items-center justify-center' > 
                <input type="checkbox" />
            </td> 
            {filed.map((col: any) => (
                    col.display && (
                        <td className='text-white w-[250px] flex justify-center items-center' key={col.id}>
                        {col.label === 'productImageSlug' ? (
                            <Image src={`/images/${item[col.label]}`} alt="Product image" width={100} height={100} className='my-0 mx-auto'/>
                        ) : col.label === 'productStatus' ? (
                            <div className={item[col.label] === 0 ? 'bg-red-800 rounded-[40px]' : item[col.label] === 1 ? 'bg-blue-600 rounded-[40px]' : 'bg-yellow-500-800 rounded-[40px]'}>
                            <span>
                                {item[col.label] === 0 ? 'Chưa kích hoạt' : item[col.field] === 1 ? 'Đã kích hoạt' : 'Chờ xử lý'}
                            </span>
                            </div>
                        ) : (
                            item[col.label]
                        )}
                        </td>
                    )
                    ))}

            <td className='w-[250px] flex items-center justify-center'>
                <button>Xóa</button>
                <button>Sửa</button>
            </td>
          </tr>
        ))}
    </tbody>
   </table>
  )
}



export default Table