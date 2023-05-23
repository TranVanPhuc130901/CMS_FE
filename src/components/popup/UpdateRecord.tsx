import React, { useEffect, useState , useMemo, useCallback} from 'react';
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from 'react-redux';

import Combobox from '../base/Combobox';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { productFiled } from '../form/Product';
import { useSpring, animated } from 'react-spring';



interface createProps {
  dataTypes: string,
  fileds: Array<any>,
  dataTitle: string,
  dataCombobox: Array<any>,
  dataRecordId: any,
  columnCombobox: Array<any>,
  api: any
}

interface FormDatas {
  [key: string]: any
}

const Editor = dynamic(() => import("../lib/MyEditor"), { ssr: false });
const UpdateRecord:React.FC<createProps> = ({dataTypes, fileds, dataTitle, dataCombobox, dataRecordId,columnCombobox, api }) => {

  const [editorLoaded, setEditorLoaded] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File>();

  const [productImageSlug, setProductImageSlug] = useState('');

  const [selectedValue, setSelectedValue] = useState('');

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

  const [formData, setFormData] = useState<FormDatas>(dataRecordId);
  
  useEffect(() => {
    setFormData(dataRecordId);
  }, [dataRecordId]);
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value , files } = e.target;
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
        [name]: value
      }));
    }
  };

  const handleEditorChange = useCallback(
    (name: string, value: string) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    },
    []
  );
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
  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api(formData, selectedImage);
      console.log('Sửa dữ liệu thành công');
      
    } catch (error) {
      console.error('Sửa dữ liệu thất bại');
      
    }


    console.log("data", formData);
    
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
                                  {editorLoaded && <Editor name={filed.name} onEditorChange={handleEditorChange} data={formData[filed.name]}/>}
                                </div>
                              ): filed.combobox ? (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col'>
                                  <label className='text-[#8f8f8f] text-[16px]' htmlFor="">{filed.title}</label>
                                  <Combobox dataCombobox={dataCombobox} columnCombobox={columnCombobox} name={filed.name} onValueChange={handleComboboxChange} defaultValue={formData[filed.name]}/>
                                </div>) : filed.image ? (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col'>
                                  <label className='text-[16px] text-[#8f8f8f]' htmlFor={filed.name}>
                                    {filed.title}
                                  </label>
                                  <Image src={`/images/${formData[filed.name]}`} alt='Preview' className=''  width={100} height={100}/> 
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
                              ) :
                              (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col' key={filed.id}>
                                  <label className='text-[16px] text-[#8f8f8f]' htmlFor={filed.name}>
                                    {filed.title}
                                  </label>
                                  <input
                                    className='rounded-lg border-[1px] border-[#424242] text-[#8f8f8f] outline-none w-full px-3 py-2 bg-[#232223]'
                                    placeholder={filed.title}
                                    type={filed.type}
                                    name={filed.name}
                                    value={formData[filed.name] || ''}
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
                    <button className='bg-[#913a47] text-white px-6 py-2 rounded-[50px] hover:bg-[#742e39] hover:text-[#d0d0d0]'onClick={handleAddRecord}>Sửa</button>
                    <button className='border-[1px] border-[#d0d0d0] text-[white] px-6 py-2 rounded-[50px] hover:bg-[#d0d0d0] hover:text-black'>Hủy</button>
                  </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateRecord