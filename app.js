let  express=require('express');
let app=express();
let Post=require('./models/posts').Post;
let mongoose=require('mongoose');
let postsRouter =require('./routes/posts'); 
let callbackRequestsRouter= require('./routes/callback-requests');
let emailsRouter=require('./routes/emails');
let usersRouter=require('./routes/users');
let cookieParser=require('cookie-parser');
let auth=require('./controllers/auth');

let bcrypt=require('bcrypt');


let User=require('./models/users').User;


app.set('view engine','ejs');

let multer=require('multer');

mongoose.connect('mongodb+srv://ShikharSrivastava:Shikhar1234@mycluster.qaagi.mongodb.net/travels',{useUnifiedTopology:true});

let imageStorage=multer.diskStorage(
    {
        destination:(req,file,cb)=>cb(null,'public/images'),
        filename:(req,file,cb)=>cb(null,file.originalname)
    }
    )
app.use(multer({storage:imageStorage}).single('imageFile'));
app.use(express.json());



app.use(express.static('public'));
app.use('/posts',postsRouter);

app.use('/callback-requests',callbackRequestsRouter);
app.use('/emails',emailsRouter);
app.use('/users',usersRouter);
app.use(cookieParser());


app.get('/admin',(req,resp)=>{
    let token=req.cookies['auth_token'];
    if(token && auth.checkToken(token))
    { 
    resp.render('admin');
   }
   else
   {
     resp.redirect('/login');
   }
})

app.get('/login',(req,resp)=>{
    resp.render('login');
})


app.get('/sight',async (req,resp)=>{
    let id=req.query.id;
    let post = await Post.findOne({id:id});
    resp.render('sight',{
        title:post.title,
        imageURL:post.imageURL,
        date:post.date,
        text:post.text
    })

})







app.listen(3000,()=>console.log('Listening 3000'));
