let db = require('../db/index')
let redisClient = require('../db/redisdb')
let fs = require('fs')
let jsonwebtoken = require('jsonwebtoken')

exports.login = (req, res) => {//用户登录
    var sql = 'select * from test_user where iduser = ? and pwduser = ?'
    db.query(sql, [req.query.iduser, req.query.pwduser], (err, data) => {
        if(err) {
            return res.send({
              status: 400,
              message: "登录失败"
            })
        }
         
        if(data.length > 0) {
          var mytoken = jsonwebtoken.sign({ name: req.query.iduser},'this is sign', { expiresIn: '2h' })

          return res.send({
            status: 200,
            message: "登录成功",
            token:mytoken,
            data
          })
        }else{
          res.send({
            status: 202,
            message: '用户名或密码错误'
          })
        }
    })
  }

exports.tgetuser = (req,res) => {//根据id搜索用户信息
    var sql = 'select username from test_user where iduser = ?'
    db.query(sql,[req.query.iduser],(err,data)=>{
        if(err){
            return res.send('错误！')
        }
        res.send(data)
    })
}

exports.tgetusershelf = (req,res) => {//获取用户书架信息
    var sql = 'select idbook,name,total,author,state,type from test_shelf,test_comic where usershelf = ? and booktype = ? and idbook = id'
    db.query(sql,[req.query.iduser,req.query.booktype],(err,data) => {
        if(err){
            return res.send('错误')
        }
        res.send(data)
    })
}

exports.tredis = async(req,res) => {//获取存储在redis中的热门搜索排行前十
    var a = await redisClient.zRange('hotSearch', 0, -1, 'WITHSCORES').catch(err=>{
        console.log(err)
    })
    res.send({
        msg:'成功！',
        key:a.reverse().slice(0,10)
    })
}

exports.taddshelf = (req,res) => {//用户将书籍加入书架
    var sql = 'insert into test_shelf(usershelf,idbook,booktype) value(?,?,?)'
    db.query(sql,[req.body.userid,req.body.bookid,req.body.btype],(err,data)=>{
        if(err){
            return res.send('错误'+err)
        }
        res.send({
            msg:'收藏成功！',
            
        })
    })
}

exports.tdelshelf = (req,res) => {//用户从书架移出书籍
    var sql = 'DELETE from comic.test_shelf where usershelf = ? and idbook = ? and booktype = ?'
    db.query(sql,[req.body.userid,req.body.bookid,req.body.btype],(err,data)=>{
        if(err){
            return res.send('错误')
        }
        res.send({
            msg:'移出成功!'
        })
    })
}

exports.tgetcomic = (req,res) => {
    var sql = 'select id,name,author,mood from test_comic limit 10'  //id,name,author,mood
    db.query(sql,(err,data)=>{
        if(err){
            return res.send('错误！')
        }
        res.send(data)
    })
}

exports.tgetcullcomic = (req,res) => {//获取精选漫画
    var sql = 'SELECT * FROM test_comic ORDER BY score DESC limit 10'
    db.query(sql,(err,data)=>{
        if(err){
            return res.send('错误！')
        }
        res.send(data)
    })
}

exports.tgetcomicid = (req,res) => {//根据id获取漫画信息
    var sql = 'select name,author,state,score,total,blurb,type from test_comic where id = ?'  //id,name,author,mood
    var sql1 = 'select * from test_shelf where usershelf = ? and idbook = ? and booktype = ? limit 1'//查询用户书架是否有该书籍
    db.query(sql1,[req.query.userid,req.query.id,req.query.type],(err,data)=>{
        if(err){
            return res.send('错误')
        }
        //console.log(data)
        if(data!=''){
            db.query(sql,[req.query.id],(err,data)=>{
                if(err){
                    return res.send('错误！')
                }
                res.send({
                    msg:1,//表示用户已收藏该书籍
                    content:data
                })
            })
        }else{
            db.query(sql,[req.query.id],(err,data)=>{
                if(err){
                    return res.send('错误！')
                }
                res.send({
                    msg:0,//表示未将该书籍加入书架
                    content:data
                })
            })
        }
    })
}


exports.tgetinternal = (req,res) => {//获取书城页国内板块内容
    var sql = 'select id,name,author,score,mood,blurb from test_comic where region="中国" and type REGEXP ?'
    db.query(sql,[req.query.type],(err,data)=>{
        if(err){
            return res.send('获取失败！')
        }
        res.send(data)
    })
}

exports.tgetsomecomic = (req,res) => {//获取首页热血漫画精选内容
    var sql = 'select id,name,author,mood from test_comic where type REGEXP ? ORDER BY score DESC limit 10'
    db.query(sql,[req.query.type],(err,data)=>{
        if(err){
            return res.send('获取失败！')
        }
        res.send(data)
    })
}

exports.tsearch = (req,res) => {//根据漫画名/作者名搜索漫画
    var sql = 'select id,name,author,type,blurb from test_comic where name REGEXP ? or author REGEXP ?'
    redisClient.zIncrBy('hotSearch',1,req.query.seakey)
    db.query(sql,[req.query.seakey,req.query.seakey],(err,data)=>{
        if(err){
            return res.send('错误！')
        }
        res.send(data)
    })
}

exports.tgetpress = (req,res) => {//获取评论列表
    var sql = 'select idpress,lssuer,content,answer,good from test_press where parent = ?'
    db.query(sql,[req.query.parent],(err,data)=>{
        if(err){
            return res.send('错误！')
        }
        res.send(data)
    })
}

exports.tlssuer = (req,res) => {//用户发表评论
    var sql = 'insert into test_press(parent,lssuer,content,answer,good) value(?,?,?,?,?)'
    console.log(req.body)
    db.query(sql,[req.body.parent,req.body.lssuer,req.body.content,req.body.answer,req.body.good],(err,data)=>{
        if(err){
            return res.send('错误')
        }
        res.send({
            msg:'发表评论成功！'
        })
    })
}

exports.tgetmanhua = (req,res) => {//获取漫画内容
    res.writeHead(200,{'Content-Type':'image/jpg'})
    fs.readFile('./comic/1000/01/'+req.query.num+'.jpg','binary',function(err,file){
        if(err){
            console.log(err);
            return;
        }else{
            res.write(file,'binary')
            res.end()
        }
    });
}

exports.testjwt = (req,res) => {//生成token并返回给客户端
    var mytoken = jsonwebtoken.sign({name:req.query.name},'this is sign',{
        expiresIn:120 // 单位：秒
    })
    res.send({
        token:mytoken
    })
}

exports.ttt = (req,res) => {
    let token = req.headers.authorization.split(" ")[1];
    console.log(token)
    console.log(req.auth)
    res.send({
        msg:'测试成功！',
    })
}

exports.changehead = (req,res) => {//用户上传头像至服务器
    const {file,body} =req
   //判断是否发送的是空文件回来
   console.log(req)
   console.log(req.body.name)
   res.send('成功')
}


// module.exports = storage