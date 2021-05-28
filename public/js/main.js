

let callMeForm = document.querySelector('.call-me-form');

let callbtn=document.querySelector('.call-btn');



document.addEventListener('DOMContentLoaded', async function () {
    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    posts.forEach((post)=> {
        let postHTML = `
        <div class="col-4">
        <div class="card" >
       <img src="${post.imageURL}" class="card-img-top" alt="${post.title}">
       <div class="card-body">
         <h5 class="card-title">
             ${post.title}
         </h5>
         <p class="card-text">
         ${post.description}
         </p>
         <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
       </div>
        </div>
     </div>`;
  articles.insertAdjacentHTML('beforeend',postHTML);
 
      //articles.insertAdjacentElement('beforeend', postHTML);
    });
   
    
  });
  
  callbtn.addEventListener('click',function(e)
  {
    
    e.preventDefault();
    let phoneInp=callMeForm.querySelector('input');
    //console.log(phoneInp.value);
   
    fetch('http://localhost:3000/callback-requests',{
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      
      body:JSON.stringify({
        phoneNumber:phoneInp.value.toString()
      })
    }).then((resp)=>resp.text()).then(()=>alert('call request added'));
   

  })

  
 