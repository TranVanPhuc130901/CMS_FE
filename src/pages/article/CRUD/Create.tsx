import CreateRecord from '@/components/popup/createRecord'
import React, { useState } from 'react'

interface createPropsAricle {
    dataTypes: string,
    fileds: Array<any>,
    dataTitle: string,
    
}

const Create:React.FC<createPropsAricle> = () => {
  const [loadingCreate, setLoadingCreate] = useState(false);
    const filed = [
        {id: 1, title: "Tên Tin tức", type: 'text', name: 'title' },
        {id: 2, title: "Mô tả Tin tức", type: 'text', name: 'content' },
        {id: 3, title: "Người tạo", type: 'text', name: 'author' },
        {id: 4, title: "Ảnh Tin tức", image: true, name: 'image' },
        {id: 5, title: "Chi tiết Tin tức", textEditor: true, name: 'description'},
    ]
  return (
    <div className='w-full bg-[#212529] p-5'>
        <CreateRecord dataTypes='article'
         fileds={filed}
        dataTitle='Tin Tức'
         dataCombobox={[]}
        loadingCreate={loadingCreate}
        setLoadingCreate={setLoadingCreate}/>
    </div>
  )
}

export default Create

