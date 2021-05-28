let  uniqid=require('uniqid');
let CallbackRequest=require('../models/callback-requests').CallbackRequest;
let express=require('express');
let router=express.Router();



router.get('/',async (req,resp)=>{
    
let cb=await CallbackRequest.find();
resp.send(cb);
    
    
});


router.post('/',async (req,resp)=>{
    let reqBody=req.body;
    //console.log(req.body.phoneNumber);
    let newRequest= new CallbackRequest({
        id:uniqid(),
        phoneNumber:reqBody.phoneNumber,
        date:new Date()
    });
    await newRequest.save();
    resp.send(' Request Accepted');

});


router.delete('/:id',async (req,resp)=>{
await CallbackRequest.deleteOne({id:req.params.id});
resp.send("Deleted");  
});



module.exports=router;
