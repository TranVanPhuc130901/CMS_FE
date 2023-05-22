import React, { useEffect, useState , useMemo, useCallback} from 'react';
import dynamic from "next/dynamic";

import Combobox from '../base/Combobox';
import Image from 'next/image';
import { toast } from 'react-toastify';



interface createProps {
  dataTypes: string,
  fileds: Array<any>,
  dataTitle: string,
  dataCombobox: Array<any>,
  dataRecordId: Array<any>
}

interface FormDatas {
  [key: string]: any
}

const Editor = dynamic(() => import("../lib/MyEditor"), { ssr: false });
const UpdateRecord:React.FC<createProps> = ({dataTypes, fileds, dataTitle, dataCombobox, dataRecordId}) => {

  const [editorLoaded, setEditorLoaded] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File>();

  const [productImageSlug, setProductImageSlug] = useState('');

  const [selectedValue, setSelectedValue] = useState('')

  useEffect(()=> {
    setEditorLoaded(true);
  },[])

  const [formData, setFormData] = useState<FormDatas>({
    title: '',
    content: '',
    author: '',
    image: '',
    description: '',
    productID: 0,
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

  const convertDataProductToFormData = (dataRecordId: any): FormDatas => ({
    title: '',
    content: '',
    author: '',
    image: '',
    description: '',
    productID: dataRecordId.productID || 0,
    productCode: dataRecordId.productCode || '',
    productName: dataRecordId.productName || '',
    productDescription: dataRecordId.productDescription || '',
    productStatus: dataRecordId.productStatus || 0,
    productImageSlug: dataRecordId.productImageSlug || '',
    productCost: dataRecordId.productCost || 0,
    productPromotional: dataRecordId.productPromotional || 0,
    productContentName: dataRecordId.productContentName || '',
    productMetaDataTitle: dataRecordId.productMetaDataTitle || '',
    productMetadataDescrition: dataRecordId.productMetadataDescrition || '',
    categoryId: dataRecordId.categoryId || '',
  });
  

  useEffect(() => {
    // Gán giá trị ban đầu cho formData từ dataRecordId
    setFormData(convertDataProductToFormData(dataRecordId));
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

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
  
    const {
      productID,
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
  
    const apiUrl = `https://localhost:7093/api/Product/${productID}`;
  
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productID,
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
        toast.success('Sửa dữ liệu thành công')
        console.log('Thêm dữ liệu thành công:', data);
      })
      .catch(error => {
        toast.error('Sửa dữ liệu thất bại')
        // Xử lý phản hồi lỗi
        console.error('Lỗi khi thêm dữ liệu:', error.message);
      });
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
                        switch (dataTypes) {
                          case 'article':
                            return (
                              <React.Fragment key={filed.id}>
                                {filed.textEditor ? (
                                  <div className='flex gap-y-1 flex-col w-full'>
                                    <label className='text-[#8f8f8f] text-[16px]' htmlFor={filed.name}>
                                      {filed.title}
                                    </label>
                                    {editorLoaded && <Editor name={filed.name} onEditorChange={handleEditorChange} data={dataRecordId[filed.name]}/>}
                                  </div>
                                ) : filed.image ? (
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
                                ) : (
                                  <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col' key={filed.id}>
                                    <label className='text-[16px] text-[#8f8f8f]' htmlFor={filed.name}>
                                      {filed.title}
                                    </label>
                                    <input
                                      className='rounded-lg border-[1px] border-[#424242] text-[#8f8f8f] outline-none w-full px-3 py-2 bg-[#232223]'
                                      placeholder={filed.title}
                                      type={filed.type}
                                      name={filed.name}
                                      value={dataRecordId[filed.name]}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                )}
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
                                  {editorLoaded && <Editor name={filed.name} onEditorChange={handleEditorChange} data={formData[filed.name]}/>}
                                </div>
                              ): filed.combobox ? (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col'>
                                  <label className='text-[#8f8f8f] text-[16px]' htmlFor="">{filed.title}</label>
                                  <Combobox dataCombobox={dataCombobox} name={filed.name} onValueChange={handleComboboxChange} defaultValue={formData[filed.name]}/>
                                </div>) : filed.image ? (
                                <div className='flex w-[calc(50%-6px)] gap-x-3 mb-3 gap-y-1 flex-col'>
                                  <label className='text-[16px] text-[#8f8f8f]' htmlFor={filed.name}>
                                    {filed.title}
                                  </label>
                                  <Image src={`/images/${dataRecordId[filed.name]}`} alt='Preview' className=''  width={100} height={100}/> 
                                  <input
                                    className='rounded-lg border-[1px] border-[#424242] text-[#8f8f8f] outline-none w-full px-3 py-2 bg-[#232223]'
                                    placeholder={filed.title}
                                    type='file'
                                    name={filed.name}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              ) : (
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

export default UpdateRecord