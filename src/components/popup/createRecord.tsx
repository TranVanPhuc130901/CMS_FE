''

import React, { useEffect, useState , useMemo, useCallback, Dispatch, SetStateAction} from 'react';
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux';

import Combobox from '../base/Combobox';
import { toast } from 'react-toastify';
import {useSpring, animated} from 'react-spring'
import { Product } from '@/interfaces/Product';

interface createProps {
  dataTypes: string,
  fileds: Array<any>,
  dataTitle: string,
  dataCombobox: Array<any>,
  columnCombobox: Array<any>,
  valueAddRecord: object,
  api: any
}


const Editor = dynamic(() => import("../lib/MyEditor"), { ssr: false });

const CreateRecord:React.FC<createProps> = ({dataTypes, fileds, dataTitle, dataCombobox,columnCombobox, valueAddRecord, api}) => {

  const [editorLoaded, setEditorLoaded] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isActive, setIsActive] = useState(false);
 
  const dispatch = useDispatch();


  const buttonAnimation = useSpring({
    transform: isActive ? 'scala(1.2' : 'scale(1)',
    backgroundColor: isActive ? '#913a47' : '#ffffff',
    color: isActive ? '#ffffff' : '#913a47'
  })
  useEffect(()=> {
    setEditorLoaded(true);
  },[])

  const [formData, setFormData] = useState<Product>(valueAddRecord as Product);
    
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    
    if (files && files[0]) {
      const filename = files[0].name;
      setFormData(prevFormData => ({
         ...prevFormData,
        [name]: filename
     }));
      setSelectedImage(files[0]);
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: e.target.value
      }));
    }
  };

  const handleButtonClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string) => {
    event.preventDefault();
  
    setIsActive((prevIsActive) => {
      const newValue = prevIsActive ? '0' : '1';
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue,
      }));
      return !prevIsActive;
    });
  }, [setFormData]);
  
  

  const handleEditorChange = useCallback(
    (name: string, value: string) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    },
    []
  );

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api(formData, selectedImage);
      // console.log('thêm dữ liệu thành công');
    } catch (error) {
      console.error('Lỗi khi thêm dữ liệu:');
    }
  };

  const handleComboboxChange = useCallback((value: string, name: string) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value
      };
      console.log(updatedFormData);
      return updatedFormData;
    });
  }, [setFormData]);
  
  return (
    
    //222020
    <div className='w-full bg-[#242322] shadow-ct'>
        <div className='w-full'>
            <form action='/' className='h-full overflow-auto p-5 flex flex-col gap-y-2'>
                <div className='flex justify-between'>
                  <div className='font-bold text-[26px] text-[white]'>Thêm {dataTitle}</div>
                  <div className='cursor-pointer'>
                  </div>
                </div>
                <div className='flex flex-col gap-y-3'>
                 <div className='flex flex-col gap-y-3'>
                 <div className='flex gap-x-3 w-full flex-wrap'>
                 {fileds.map((filed: any) => {
                            // Các trường hợp khác cho 'product'
                            return (
                              <React.Fragment key={filed.id}>
                              {filed.textEditor ? (
                                <div className='flex gap-y-1 flex-col w-full'>
                                  <label className='text-[#8f8f8f] text-[16px]' htmlFor={filed.name}>
                                    {filed.title}
                                  </label>
                                  {editorLoaded && <Editor name={filed.name} onEditorChange={handleEditorChange}/>}
                                </div>
                              ): filed.combobox ? (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col'>
                                  <label className='text-[#8f8f8f] text-[16px]' htmlFor="">{filed.title}</label>
                                  <Combobox dataCombobox={dataCombobox} columnCombobox={columnCombobox} name={filed.name} onValueChange={handleComboboxChange} />
                                </div>) : filed.image ? (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col'>
                                  <label className='text-[16px] text-[#8f8f8f]' htmlFor={filed.name}>
                                    {filed.title}
                                  </label>
                                  <input
                                    className='rounded-lg border-[1px] border-[#424242] text-[#8f8f8f] outline-none w-full px-3 py-2 bg-[#232223]'
                                    placeholder={filed.title}
                                    type='file'
                                    name={filed.name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              ) : filed.animation ? (
                                <div className='flex flex-col gap-y-1'>
                                <label className='text-[16px] text-[#8f8f8f]' htmlFor={filed.name}>
                                    {filed.title}
                                  </label>
                                <animated.button
                                  className="button"
                                  style={buttonAnimation}
                                  onClick={ (event: any) => handleButtonClick(event,filed.name)}
                                  value={isActive ? '1' : '0'}
                                  name={filed.name}
                                  >
                                {isActive ? 'Active' : 'Unactive'}
                              </animated.button></div>
                              )
                              : (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col' key={filed.id}>
                                  <label className='text-[16px] text-[#8f8f8f]' htmlFor={filed.name}>
                                    {filed.title}
                                  </label>
                                  <input
                                    className='rounded-lg border-[1px] border-[#424242] text-[#8f8f8f] outline-none w-full px-3 py-2 bg-[#232223]'
                                    placeholder={filed.title}
                                    type={filed.type}
                                    name={filed.name}
                                    value={formData[filed.name as keyof Product]}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              )
                              }
                            </React.Fragment> 
                            );
                    })}
                  </div>
                 </div>
                  {/* <div className='flex gap-y-1 flex-col'>
                    <label className='text-[#8f8f8f] text-[16px]' htmlFor="">Chi tiết bài viết</label>
                    <Editor />
                  </div> */}
                  <div className='flex flex-row-reverse gap-x-4'>
                    <button className='bg-[#913a47] text-white px-6 py-2 rounded-[50px] hover:bg-[#742e39] hover:text-[#d0d0d0]'onClick={handleAddRecord}>Thêm</button>
                    <button className='border-[1px] border-[#d0d0d0] text-[white] px-6 py-2 rounded-[50px] hover:bg-[#d0d0d0] hover:text-black'>Hủy</button>
                  </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateRecord