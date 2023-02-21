let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require('body-parser')
let router = require('./router')
const { expressjwt: jwt } = require("express-jwt");
const secretKey = 'this is sign';
let jsonwebtoken = require('jsonwebtoken')

app.use(express.static('pictrue'))
app.use(express.static('userimg'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
app.use(jwt({ secret: secretKey, algorithms: ["HS256"],//全局注册token验证
// getToken: function fromHeaderOrQuerystring (req) {
//     if (req.headers.authorization.split(" ")[0] === 'Bearer') {
//       return req.headers.authorization.split(" ")[1]
//     } else if (req.query && req.query.token) {
//       return req.query.token
//     }
//     return null
//   }
}).unless({ path:[//token免验证白名单
    // { url:'/test/testjwt',methods:['GET'] },
    { url:'/test/login',methods:['GET'] },
    { url: '/test/tgetmanhua', methods: ['GET'] },
    { url: '/test/tredis', methods: ['GET'] },
    { url: '/test/tgetcomic', methods: ['GET'] },
    { url: '/test/tgetcomicid', methods: ['GET'] },
    { url: '/test/tgetinternal', methods: ['GET'] },
    { url:'/test/tsearch',methods:['GET'] },
    { url:'/test/tgetpress',methods:['GET'] },
    { url:'/test/tgetcullcomic',methods:['GET'] },
    { url:'/test/tgetsomecomic',methods:['GET'] },
    { url:'/test/changehead',methods:['POST'] },
    { url:'/test/tlssuer',methods:['PUT'] },
]}))

app.use((err, req, res, next)=>{if(err.name === 'UnauthorizedError') {//捕获token异常并进行对应处理
    //console.log(req.headers.authorization.split(" ")[1])
    var newtoken = jsonwebtoken.sign({name:req.query.name},'this is sign',{
        expiresIn:120 // 单位：秒
    })
    res.send({
        msg:'刷新成功！',
        newtoken:newtoken
    })  
}})
app.use(router)


app.listen(90,() => {
    console.log('服务器启动成功!')
})

