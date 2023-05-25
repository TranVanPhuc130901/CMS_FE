import { useSelector } from "react-redux";

export async function requestGetProduct() {
  const token = sessionStorage.getItem('token'); 
    const response = await fetch('https://localhost:7093/api/Product', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Request failed');
  }

  export async function requestGetCategory() {
    const token = sessionStorage.getItem('token'); 
    const response = await fetch('https://localhost:7093/api/Category', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Request failed');
  }

  export async function requestGetArticle() {
    const token = sessionStorage.getItem('token'); 
    const response = await fetch('https://localhost:7093/api/Article', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Request failed');
  }

export async function requestGetUser(){
  const token = sessionStorage.getItem('token'); 
    const response = await fetch('https://localhost:7093/api/v1/User', {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    if(response.ok){
        const data = await response.json();        
        return data
    } 
    throw new Error('request Failed')
}