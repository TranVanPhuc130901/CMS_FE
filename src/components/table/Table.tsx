import React from 'react'

interface tableProps {
    data: Array<any>;
    filed: Array<any>
}

const Table: React.FC<tableProps> = ({data, filed}) => {

    console.log(filed);
    
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
                col.display && 
              <td className='text-white w-[250px] flex justify-center items-center' key={col.id}>{item[col.label]}</td>
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