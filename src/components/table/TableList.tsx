import React from "react";
import ItemTable from "./ItemTable"
import TheadTable from "./TheadTable";

interface TableListProps {
  data: Array<any>; 
  filed: Array<any>;
  dataType: string;
  valu: Array<any>
}

const TableList: React.FC<TableListProps> = ({data , filed, dataType, valu}) => {
  return (
    <table className="w-[100%] flex flex-col h-[calc(100vh-200px)] overflow-auto">
        <TheadTable row={filed} />
        <tbody className="flex gap-y-3 flex-col w-[140%] overflow-scroll scroll-none">
          <ItemTable data={data} dataType={dataType} valu={valu} />
        </tbody>
    </table>
  )
}

export default TableList