

//const User=require('../models/usersignup')
const User=require('../models/userlogin')
const Debate=require('../models/comment')
const mongoose= require('mongoose');


exports.createUser= async(req,res)=>{
    try{
        const {name,email,password} =req.body;


        const useralready=await User.findOne({email});
        if(useralready){
            req.flash('error','User exists');
            return res.redirect('/signup')
        }

        const user=await User.create({name,email,password});

        //message 
        //req.session.user = { id: user._id, email: user.email };
        req.flash('success','created success');
        res.redirect('/')
    }catch(err){
        console.log(err);
        req.flash('error','server error');
        res.redirect('/signup')
    }
};

exports.loginuser=async(req,res)=>{
    const {email,password}=req.body;
    try{
      const user=await User.findOne({email:email});
      if(!user){
       req.flash('error','email or passwword invaild');
       return res.redirect('/login')
     }

   
     req.session.user = { id: user._id, email: user.email };
        req.flash('success','login success');
        console.log(req.body);
           res.redirect('/');
     
     
    } catch(error){
        console.log(error);
        req.flash('error','error accesss')
        res.redirect('/login')

    }
}







exports.commentCreate=async(req,res)=>{
   
     try{
        if(req.session.user){
             
          const comments = new Debate({
         
             text :req.body.text,
             user:req.session.user._id
            });
          await comments.save();
          console.log(comments);
          req.flash('success','comment added')
          res.redirect('/angular-debate');
        }else{
            res.redirect('/login')
        }
       
     }catch(err){
        console.log(err);
        req.flash('error','something wrong');
        res.redirect('/angular-debate')
     };
  
}

