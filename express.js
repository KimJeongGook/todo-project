
var express = require('express') //node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')

var corsOptions = {
    origin: 'http"//localhost:3000',
    credentials: true
}

app.use('/static', express.static(__dirname + '/public')) //html 파일 설정
app.use(cors(corsOptions)) //CORS 설정
app.use(express.json()) //request body 파싱
app.use(logger('tiny')) //Logger 설정

const CONNECT_URL = 'mongodb://localhost:27017/KimJeongGook'
mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("mongodb connected ..."))
. catch(e => console.log('failed to connect mongodb: ${e}'))

// app.get(/^\/users\/(\d{4})$/, (req, res) => {
//     console.log(req.params)
//     res.send(`user id ${req.params[0]} found successfully !`)
// })
// app.get("/users/:userid([0-9]{4})", (req, res) => {
//     console.log(req.params.userId)
//     res.send(`user id ${req.params.userId} found !`)
// })
// //와일드 카드
// app.get("/users/contact", (req, res) => {
//     res.send("contact page !")
// })
// app.get("/users/city", (req, res) => {
//     res.send("city page !")
// })
// //URL 패턴매칭
// app.get("/go+gle",(req, res) => {
//     res.send("google site ")
// })

// app.get("/users/:name/comments", (req, res, next) => {
//     if (req.params.name !== "syleemomo") {
//         res.status(401).send("you are not authorized to this page !")
//     }
//     next()
// }, (req, res) => { //댓글 수정 페이지를 클라이언트로 전송
//         res.send("this is page to update your comments !") //댓글 수정 페이지 보여주기
// })

// const blockFirstUser = (req, res, next) => {
//     if (req.params.name === "kim") {
//         res.status(401).send("you are not authorized to this page !")
//     } next()
// }
// const blockSecondUser = (req, res, next) => {
//     if (req.params.name === "park") {
//         res.status(401).send("you are not authorized to this page !")
//     } next()
// }
// const allowThisUser = (req, res) => {
//     res.send("you can see this home page !")
// }

// app.get("/home/users/:name", [
//     blockFirstUser,
//     blockSecondUser,
//     allowThisUser
// ])

//next 콜백 함수
// app.get("/chance", (req, res, next) => {
//     if (Math.random() < 0.5) return next()
//     res.send("first one")
// })
// app.get("/chance", (req, res) => {
//     res.send("second one")
// })

// app.get("/fruits/:name", (req, res, next) => {
//     if (req.params.name !== "apple") return next()
//     res.send("[logic 1] you choose apple for your favorite fruit !")
// }, (req, res, next) => {
//     if (req.params.name !== "banana") return next()
//     res.send("[logic 2] you choose banana for your favorite fruit !")
// }, (req, res) => {
//     res.send(`[logic 3] you choose ${req.params.name} for you favorite fruite !`)
// })

// app.get("/shirts", (req, res) => {
//     res.send(`feature - color : ${req.query.color} / size : ${req.query.size}`)
// })

// 응답 객체
// app.get("/hello", (req, res) => {
//     res.send(`<html>
//                 <head></head>
//                 <body>
//                     <h1>Hello world !</h1>
//                     <input type='button' value='Submit'/>
//                 </body>
//             </html>`)
// })

// app.get("/hello", (req, res) => {
//     res.json({user: "syleemomo", msg: "hello !"})
// })
//리다이렉션
// app.get("/google", (req, res)=> {
//     res.redirect("https://www.google.com")
// })
// app.get("/static", (req, res) => {
//     res.render("index")
// })
// app.get("/home", (req, res)=> {
//     res.redirect("/static/index.html")
// })
// app.get("/home", (req, res)=> {
//     res.sendFile(__dirname+'/public/home.html')
// })
// app.get("/index", (req, res)=> {
//     res.sendFile(__dirname+'/public/index.html')
// })
// app.get("/detail", (req, res)=> {
//     res.sendFile(__dirname+'/public/detail.html')
// })

// //라우터 모듈
// var express = require('express');
// var router = express.Router();
// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });
// // define the home page route
// router.get('/', function(req, res) {
//     res.send('Birds home page');
// });
// //define the about route
// router.get('/about', function(req, res) {
//     res.send('About birds');
// });
// module.exports =  router;

// var birds = require('./birds');
// app.use('/birds', birds);


app.get("/users",(req, res)=> {
    res.send("all user list !") //데이터 베이스에 사용자 전체목록 조회
})

app.post("/users", (req, res) => {
    console.log(req.body.newUser)
    // 데이터베이스에 새로운 사용자 생성
    res.json(`new user - ${req.body.newUser.name} created !`) //1번 왼쪽 콤마
})

app.put("/users/:id", (req, res) => {
    console.log(req.body.updatedUserInfo)
    // 데이터베이스에서 id 값을 사용자 검색 후 업데이트(몽고 db)
    res.send(`user ${req.params.id} updated with payload ${req.body.updatedUserInfo}`
    )
})

app.delete("/users/:id", (req, res) => {
    console.log(req.params.id)
    // 데이터베이스에서 id에 해당하는 사용자 조회 후 제거
    res.send(`user ${req.params.id} removed !`)
})

app.use((req, res, next) => { //사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
    //404 페이지 전달
})

app.use((err, req, res, next) => { //서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server !")
})
app.listen(5000, () => { //5000 포트로 서버 오픈
    console.log('Server is running on port 5000...')
})