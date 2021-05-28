let User=require('../models/users').User;
let express=require('express');
let router=express.Router();
let bcrypt=require('bcrypt');
let auth=require('../controllers/auth');


router.post('/login',async (req,resp)=>{
    let email=req.body.email;
    let password=req.body.password;
    let user= await User.find().where({email:email});
    
    if(user.length>0)
    {
        let bcryptpass= await bcrypt.compare(password,user[0].password);
        if(bcryptpass)
        {
            let token=auth.generateToken(user[0]);
            resp.cookie('auth_token',token);
            resp.send('R');
           
        }
        else
        {
            
            resp.send('W');
        }
    }
    else
    {
        resp.send('W');
    }

})



router.post('/register',async (req,resp)=>{
    let email=req.body.email;
    let password=req.body.password;
    let user= await User.find().where({email:email});
    let encryptedPass=await bcrypt.hash(password,12); 
    if(user.length===0)
    {
    let newUser= new User({
        email:email,
        password:encryptedPass
    })
    await newUser.save();
    resp.send('Registration complete');
    }
    else
    {
        resp.send('Email already in use');
    }

})


module.exports=router;