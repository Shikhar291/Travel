let addPostBtn=document.querySelector('.create-post-btn');
let logOutBtn=document.querySelector('.log-out-btn');

document.addEventListener('DOMContentLoaded', async function () {
  addPosts();
  addCallbackRequests();
  addEmails();
  
});



  addPostBtn.addEventListener('click',function()
  {

let atriclesTab=document.getElementById('v-pills-articles');
atriclesTab.classList.remove('show');
atriclesTab.classList.remove('active');



let createTab=document.getElementById('v-pills-create-post');
createTab.classList.add('show');
createTab.classList.add('active');

  });


  async function addPosts()
  {


    let posts = await getPosts();
    let articles = document.querySelector('.articles');
    let i=1;
    articles.innerHTML = '';
    posts.forEach((post)=> {
        let postHTML = 
        `<article class="d-flex justify-content-between align-items-center articles-inline">
      <div class="num w5" >${i++}</div>
      <input class="id" type="hidden" value="${post.id}"> 
      <div class="name w30">${post.title}</div>
      <div class="date w30">${post.date}</div>
      <div class="country w20">${post.country}</div>
      <div class="edit w10">  <button class="btn btn-link btn-edit">Edit</button>  </div>
      <div class="remove w5">  <button class="btn btn-link btn-remove">X</button>  </div>
  </article>`;
  articles.insertAdjacentHTML('beforeend',postHTML);
 
      //articles.insertAdjacentElement('beforeend', postHTML);
    });

  }

  async function addCallbackRequests()
  {

    let requests = await getCallbackRequests(); 
    let requestsBlock = document.querySelector('#v-pills-callback');
    let i=1;
    requestsBlock.innerHTML = '';
    requests.forEach((request)=> {
        let requestHTML = 
        `<article class="d-flex justify-content-between align-items-center articles-inline">
      <div class="num w5" >${i++}</div>
      <input class="id" type="hidden" value="${request.id}"> 
      <div class="name w60">${request.phoneNumber}</div>
      <div class="date w30">${request.date}</div>
      <div class="remove w5">  <button class="btn btn-link btn-remove">X</button>  </div>
  </article>`;
  requestsBlock.insertAdjacentHTML('beforeend',requestHTML);
 
      //articles.insertAdjacentElement('beforeend', postHTML);
    });

  }
  async function addEmails()
  {


    let requests = await getEmails(); 
    let requestsBlock = document.querySelector('#v-pills-mails');
    let i=1;
    requestsBlock.innerHTML = '';
    requests.forEach((request)=> {
        let requestHTML = 
        `<article class="d-flex justify-content-between align-items-center articles-inline">
      <div class="num w5" >${i++}</div>
      <input class="id" type="hidden" value="${request.id}"> 
      <div class="name w30">${request.name}</div>
      <div class="email w130">${request.email}</div>
      <div class="date w230">${request.date}</div>
      <div class="remove w5">  <button class="btn btn-link btn-remove">X</button>  </div>
  </article>

  <div class="text w100 emailtext">
  
  <div class="e1">
  <h6>Message:<h6>
  </div>

  <div class="e2">
  ${request.text}
  </div>
  
  </div>`;
  
  requestsBlock.insertAdjacentHTML('beforeend',requestHTML);
 
      //articles.insertAdjacentElement('beforeend', postHTML);
    });




  }

  logOutBtn.addEventListener('click',function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
window.location.href='/';


  })

