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
        console.log(reponse);
        return reponse.json();
    } 
    else {
        console.log('đăng nhập thất bại');
        
    }
    } catch (error) {
        console.error('lồi', error);
        
    }
}