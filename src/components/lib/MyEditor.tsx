'use client'

import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


interface MyEditorProps {
  name: string;
  onEditorChange: (name: string, value: string) => void;
  data?: string; // Thêm prop data với kiểu string
}

const MyEditor:React.FC<MyEditorProps> = ({name, onEditorChange, data}) => {
  const [content, setContent] = useState(data || '');

  const handleEditorChange = (event:any, editor:any) => {
    const newData = editor.getData();
    setContent(newData);
    onEditorChange(name, newData);
  };

  return (
    <div className='h-full bg-[#232223] text-[#8f8f8f]'>
      <CKEditor
      editor={ClassicEditor}
      data={content}
      onChange={handleEditorChange}
      // Đặt chiều cao 100%
    />
    </div>
  );
};

export default MyEditor;
