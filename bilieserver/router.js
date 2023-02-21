let express = require('express')
let router = express.Router()
let test = require('./API/test')
let multer = require('multer')

// router.use((err, req, res, next)=>{if(err.name === 'UnauthorizedError') {
//     console.log('!!!')
//     res.send({
//         msg:'错误'
//     })  
// }})

var storage = multer.diskStorage({
    //存储的位置
    destination: 'userimg/', // 保存的路径，备注：需要自己创建
    //文件名字的确定 multer默认帮我们取一个没有扩展名的文件名，因此需要我们自己定义
    filename(req, file, cb) {
        // cb(null, Date.now() + file.originalname)
        cb(null, req.body.name+req.body.ctype+'.jpg')
    }
})

let upload = multer({storage:storage})

router.get('/test/login',test.login)
router.get('/test/tgetuser',test.tgetuser)
router.get('/test/tgetusershelf',test.tgetusershelf)
router.get('/test/tredis',test.tredis)
router.get('/test/tgetcomic',test.tgetcomic)
router.get('/test/tgetcullcomic',test.tgetcullcomic)
router.get('/test/tgetsomecomic',test.tgetsomecomic)
router.get('/test/tgetcomicid',test.tgetcomicid)
router.get('/test/tgetmanhua',test.tgetmanhua)
router.get('/test/tgetinternal',test.tgetinternal)
router.get('/test/tsearch',test.tsearch)
router.get('/test/tgetpress',test.tgetpress)

router.post('/test/changehead',upload.single('img'),test.changehead)
router.post('/test/taddshelf',test.taddshelf)

router.delete('/test/tdelshelf',test.tdelshelf)

router.put('/test/tlssuer',test.tlssuer)

//test
router.get('/test/testjwt',test.testjwt)
router.get('/test/ttt',test.ttt)

module.exports = router