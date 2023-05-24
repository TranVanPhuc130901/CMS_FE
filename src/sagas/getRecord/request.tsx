export async function requestGetProduct() {
    const response = await fetch('https://localhost:7093/api/Product', {
      method: 'GET'
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Request failed');
  }

  export async function requestGetCategory() {
    const response = await fetch('https://localhost:7093/api/Category');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Request failed');
  }

  export async function requestGetArticle() {
    const response = await fetch('https://localhost:7093/api/Article');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Request failed');
  }

export async function requestGetUser(){
    const response = await fetch('https://localhost:7093/api/v1/User');
    if(response.ok){
        const data = await response.json();        
        return data
    } 
    throw new Error('request Failed')
}