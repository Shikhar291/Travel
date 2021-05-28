{
let articlesBlock=document.querySelector('.articles');
let textArea=document.querySelector('#update-text');
let  titleInp=document.querySelector('#update-title');
let updateForm=document.querySelector('.updatepost');
let id;

articlesBlock.addEventListener('click', async function(e){
if(e.target.classList.contains('btn-edit'))
{

id=e.target.parentNode.parentNode.querySelector('.id').value;
let postInfo= await fetch('http://localhost:3000/posts/'+id).then((resp)=>resp.json()).then((data)=>data);

titleInp.value=postInfo.title;
textArea.value=postInfo.text;


    let atriclesTab=document.getElementById('v-pills-articles');
    atriclesTab.classList.remove('show');
    atriclesTab.classList.remove('active');
    
    let updateTab=document.getElementById('v-pills-update-post');
    updateTab.classList.add('show');
    updateTab.classList.add('active');

 


}

})

updateForm.addEventListener('click',function(e){
e.preventDefault();
fetch('http://localhost:3000/posts/'+id,
{
method:'PUT',

headers:{'Content-Type':'application/json'},

body:JSON.stringify({
    title:titleInp.value,
    text:textArea.value,
    description:textArea.value.substring(0,textArea.value.indexOf('.')+1)  
})

}).then((resp)=>resp.text()).then(()=> window.history.go());


})




}