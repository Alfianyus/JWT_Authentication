require('dotenv').config()

const express = require('express')
const app = express()

const jwt=require('jsonwebtoken')

app.use(express.json())

const posts=[
    {
        username:'alfian',
        title:'pos 1'
    },
    {
        username:'febri',
        title:'pos 2'
    }
]

app.get('/posts', authenticateToken, (req, res)=>{
  res.json(posts.filter(post=>post.username === req.user.name))
})

app.post('/login', (req, res)=>{
    //authentication user
    const username= req.body.username
    const user ={name:username}

 const access_Token=jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
 res.json({access_Token:access_Token})
})

function authenticateToken(req,res,nex){
  const authHeader=req.headers['authorization']
  const token= authHeader && authHeader.split('')[1]
  if(token == null) return res.sendStatus(401)

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user )=>{
    if(err) return res.sendStatus(403)
    req.user=user
    next()
  })
  
}

app.listen(3000)
