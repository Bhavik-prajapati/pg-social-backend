const express = require('express');
const userRoutes=require("./routes/userRoutes");
const followRoutes = require('./routes/followRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const cors=require("cors");
  
const dotenv=require("dotenv");
dotenv.config();

const app=express();
app.use(cors());


// app.use(express.json());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.use('/api/users', userRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/posts', postRoutes);  
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);


app.get("/",(req,res)=>{
      res.send('🚀 Welcome to the LinkedIn-style Social Media API');
})

app.use((err,req,res,next)=>{
    console.error(err.stack);   
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
})

module.exports=app;

