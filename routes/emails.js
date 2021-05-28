let  uniqid=require('uniqid');
let Email=require('../models/emails').Email
let express=require('express');
let router=express.Router();


router.get('/',async (req,resp)=>{

let cb=await Email.find();
resp.send(cb);

});


router.post('/',async (req,resp)=>{
    let reqBody=req.body;
    //console.log(req.body.phoneNumber);
    let newEmail= new Email({
        id:uniqid(),
        name:reqBody.name,
        text:reqBody.text,
        email:reqBody.email,
        date:new Date()
    });
    await newEmail.save();
    resp.send('Message Sent');

});


router.delete('/:id',async (req,resp)=>{
await Email.deleteOne({id:req.params.id});
resp.send("Deleted");  
});



module.exports=router;
