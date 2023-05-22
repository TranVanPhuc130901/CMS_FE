import { getArticle, getCategory, getProduct, getUser } from '@/sagas/getRecord/getSlice';
import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'

const ApiList = () => {

    const dispath = useDispatch();

    useEffect(() => {
        dispath(getProduct());
        dispath(getCategory());
        dispath(getArticle());
        dispath(getUser());
    }, [dispath]);

    const product = useSelector((state:any) => state.getRecord.products);
    const productType = useSelector((state: any) => state.getRecord.name);

    const categories = useSelector((state:any) => state.getRecord.categories);
    const categoriesType = useSelector((state: any) => state.getRecord.name);
    const article = useSelector((state:any) => state.getRecord.article);
    const user = useSelector((state:any) => state.getRecord.user);

    console.log('product', product);
    console.log('product', productType);
    console.log('category', categories);
    console.log('product', categoriesType);
    console.log('article', article);
    console.log('user', user);

  return (
    <div>index</div>
  )
}

export default ApiList