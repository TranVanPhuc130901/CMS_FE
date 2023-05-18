''

import React, { useEffect, useState , useMemo, useCallback, Dispatch, SetStateAction} from 'react';
import dynamic from "next/dynamic";

import Combobox from '../base/Combobox';
import { toast } from 'react-toastify';
import {useSpring, animated} from 'react-spring'
import { Product } from '@/interfaces/Product';

interface createProps {
  dataTypes: string,
  fileds: Array<any>,
  dataTitle: string,
  dataCombobox: Array<any>,
  loadingCreate: boolean,
  setLoadingCreate: Dispatch<SetStateAction<boolean>>
}


const Editor = dynamic(() => import("../lib/MyEditor"), { ssr: false });

const CreateRecord:React.FC<createProps> = ({dataTypes, fileds, dataTitle, dataCombobox, loadingCreate, setLoadingCreate}) => {

  const [editorLoaded, setEditorLoaded] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [isActive, setIsActive] = useState(false);

  const buttonAnimation = useSpring({
    transform: isActive ? 'scala(1.2' : 'scale(1)',
    backgroundColor: isActive ? '#913a47' : '#ffffff',
    color: isActive ? '#ffffff' : '#913a47'
  })

  

  useEffect(()=> {
    setEditorLoaded(true);
  },[])

  const [formData, setFormData] = useState<Product>({
    productCode: '',
    productName: '',
    productDescription: '',
    productStatus: 0,
    productImageSlug: '',
    productCost: 0,
    productPromotional: 0,
    productContentName: '',
    productMetaDataTitle: '',
    productMetadataDescrition: '',
    categoryId: '',
  });
    
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

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    const {
      productCode,
      productName,
      productDescription,
      productStatus,
      productImageSlug,
      productCost,
      productPromotional,
      productContentName,
      productMetaDataTitle,
      productMetadataDescrition,
      categoryId
    } = formData;
  
    const apiUrl = 'https://localhost:7093/api/Product';
    setLoadingCreate(true)
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productCode,
        productName,
        productDescription,
        productStatus,
        productImageSlug,
        productCost,
        productPromotional,
        productContentName,
        productMetaDataTitle,
        productMetadataDescrition,
        categoryId
      }),
      
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Lỗi khi thêm dữ liệu');
        }
      })
      .then(data => {
        if (selectedImage) {
          const uploadFormData = new FormData();
          uploadFormData.append('image', selectedImage);
      
          fetch('/api/upload-image', {
            method: 'POST',
            body: uploadFormData,
          })
            .then((uploadResponse) => {
              if (uploadResponse.ok) {
                console.log('Lưu ảnh thành công');
                // Tiếp tục thực hiện các bước khác sau khi lưu ảnh thành công
              } else {
                throw new Error('Lỗi khi lưu ảnh');
              }
            })
            .catch((uploadError) => {
              console.error('Lỗi khi lưu ảnh:', uploadError);
            });
        }
        // Xử lý phản hồi thành công
        toast.success('Thêm dữ liệu thành công')
        console.log('Thêm dữ liệu thành công:', data);
      })
      .catch(error => {
        // Xử lý phản hồi lỗi
        toast.error('Thêm dữ liệu thất bại')
        console.error('Lỗi khi thêm dữ liệu:', error.message);
      }).finally(() => {
        setLoadingCreate(false);
        console.log(formData);
      });
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
                        switch (dataTypes) {
                          case 'article':
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
                                  <Combobox dataCombobox={dataCombobox} name={filed.name} onValueChange={handleComboboxChange} defaultValue=''/>
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
                                  onClick={ (event) => handleButtonClick(event,filed.name)}
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
                          case 'product':
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
                                  <Combobox dataCombobox={dataCombobox} name={filed.name} onValueChange={handleComboboxChange} defaultValue=''/>
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
                                  onClick={ (event) => handleButtonClick(event,filed.name)}
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
                          case 'user':
                            // Các trường hợp khác cho 'user'
                            return null;
                          default:
                            return null;
                        }
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