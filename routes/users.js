var express = require('express');
var router = express.Router();
const userControl=require('../controllers/user');
const Comments=require('../models/comment');
const app=express();



/* GET home page. */
router.get('/', function(req, res, next) {

  let user=req.session.user;
 // console.log('..........',req.session.user);
  res.render('index',{user});


   
   
 
});


//LOGIN ROUTER

router.get('/login',function(req,res){
  //console.log(req.body)
  res.render('user/login') 
})


router.post('/login',userControl.loginuser)


//SIGNUP 
router.get('/signup',(req,res)=>{
  res.render('user/signup',{message:req.flash()});
})

router.post('/signup',userControl.createUser)

router.get('/signout',(req,res)=>{
  req.session.destroy();
    
    res.redirect('/')


})
router.get('/logout',(req,res)=>{
  req.session.destroy();
    
    res.redirect('/')


})

//BLOG ROUTER
router.get('/angular-blog',(req,res)=>{
  if(req.session.user){
    res.render('user/angular-blog',{message:req.flash()})
  }else{
    req.flash('error','please login firstly')
    res.redirect('/login')
  }
 
})


router.get('/angular-debate',async(req,res)=>{
 if(req.session.user){
  res.render('user/angular-debate',{message:req.flash(),user:req.session.user,Comments});
 }else{
  
   res.redirect('/login');
 }
   

});


router.post('/angular-debate/',userControl.commentCreate)

module.exports = router;
