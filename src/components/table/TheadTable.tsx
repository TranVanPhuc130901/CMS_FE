import React from 'react';

interface PropsTheadTable {
    row: any[];
  }
  
  const TheadTable: React.FC<PropsTheadTable> = ({ row }) => {
    return (
      <thead className='w-[140%]'>
        <tr className="flex py-2 text-[#8f8f8f]">
          {row.map((r: any) => {
            return (
              <th key={r} scope="col" className="w-[250px]">
                {r}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  };
  
  export default TheadTable;
