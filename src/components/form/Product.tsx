export const ProductForm = [
    {
        id: 1,
       title: "Mã sản phẩm",
       type: 'text',
       name: 'productCode'
    },
    {
        id: 2,
        title: "Tên sản phẩm",
        type: 'text',
        name: 'productName'
     },
   
     {
        id: 3,
        title: "Ảnh đại diện sản phẩm",
        image: true,
        name: 'productImageSlug'
     },
     {
        id: 4,
        title: "Tiêu đề sản phẩm(SEO)",
        type: 'text',
        name: 'productMetaDataTitle'
     },
     {
        id: 5,
        title: "Mô tả sản phẩm(SEO)",
        type: 'text',
        name: 'productMetadataDescrition'
     },
     {
        id: 6,
        title: "Giá sản phẩm",
        type: 'text',
        name: 'productCost'
     },
     {
        id: 7,
        title: "Giá khuyến mãi sản phẩm",
        type: 'text',
        name: 'productPromotional'
     },
     {
        id: 8,
        title: "Danh mục sản phẩm",
        combobox: true,
        name: 'categoryId'
     },
     {
        id: 9,
        title: 'Content sản phẩm',
        name: 'productContentName'
     },
     {
        id: 10,
        title: 'Trạng thái',
        name: 'productStatus',
        animation: true
     }
     ,
     {
        id: 11,
        title: "Chi tiết sản phẩm",
        type: 'text',
        textEditor: true,
        name: 'productDescription'
     },
    ]

    export interface productFiled {
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
    }