export async function requestLogin(userName: any, password: any) {
    try {
        const reponse = await fetch('https://localhost:7093/api/Authentication/Login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, body: JSON.stringify({
                userName,
                password
            })
        }) ;
    if(reponse.ok){
       const data = reponse.json();
       console.log(data);
        return data
    } 
    else {
        console.log('đăng nhập thất bại');
        
    }
    } catch (error) {
        console.error('lồi', error);
        
    }
}


export async function saveToken(token: any) {
    try {
      const response = await fetch("/api/saveToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Thêm token vào request headers
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.log("Failed to save token in request headers");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  