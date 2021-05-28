
let  uniqid=require('uniqid');
let Post=require('../models/posts').Post;
let express=require('express');
let router=express.Router();



router.get('/', async (req,resp)=>{

    let posts = await Post.find();
    resp.send(posts);
})

router.get('/:id', async (req,resp)=>{
    
let id=req.params.id;
let posts=await Post.findOne({id:id});
resp.send(posts);
    
})

router.post('/', async (req,resp)=>{

let reqBody=req.body;
let imgPath;
if(reqBody.imageUrl)
{
    imgPath=reqBody.imageUrl
}
else
{
    let a=req.file.path.substring(6)
imgPath=a;
}

let newPost=new Post({
id:uniqid(),
title:reqBody.title,
date:new Date(),
description:reqBody.description,
text:reqBody.text,
country:reqBody.country,
imageURL:imgPath
});
//console.log(req.file.path.substr('public'));
//console.log(reqBody.imageUrl);
await newPost.save();
resp.send('Created');

})



router.delete('/:id',async (req,resp)=>{
    let id=req.params.id;
    await Post.deleteOne({id:id});
    resp.send('Deleted');

})

router.put('/:id',async (req,resp)=>{

    let id=req.params.id;
    await Post.updateOne({id:id},req.body);
    resp.send('Updated');

})

module.exports=router;