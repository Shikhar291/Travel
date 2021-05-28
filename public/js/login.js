let signInForm=document.querySelector('.sign-in-form');
let registerForm=document.querySelector('.register-form');

signInForm.addEventListener('submit',function(e){
    e.preventDefault();
    let email=document.getElementById('sign-in-email');
    let password=document.getElementById('sign-in-password');

    fetch('http://localhost:3000/users/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        
        body:JSON.stringify({
            email:email.value,
            password:password.value
        })

    }).then((resp)=>resp.text()).then((data)=>{

if(data==='R')
{
    window.location.href='/admin';
}
else
if(data==='W'){
alert('invalid');
}

    });
    

})

registerForm.addEventListener('submit',function(e){
    e.preventDefault();
    let email=document.getElementById('register-email');
    let password=document.getElementById('register-password');
    let repassword=document.getElementById('register-re-enter-password');

if((password.value)!==(repassword.value))
{
    alert(' passwords dont match');
    return;
}
    
    fetch('http://localhost:3000/users/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            email:email.value,
            password:password.value
        })

    }).then((resp)=>resp.text()).then((data)=>alert(data));
    

})

