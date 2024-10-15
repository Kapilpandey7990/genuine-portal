window.onload = function(){
    const token = document.cookie.split('; ').find(row=>row.startsWith('jwt='));

    if(token){
        document.getElementById('auth-link').innerHTML=``
    }
}