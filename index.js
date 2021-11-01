var express = require('express') //node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
//API 설계 및 구현4-1
var routes = require('./src/routes')

var corsOptions = {
    // origin: 'http"//localhost:3000',
    origin: '*', // 와일드 카드
    credentials: true
}

app.use(cors(corsOptions)) //CORS 설정

app.use(express.json()) //request body 파싱
app.use(logger('tiny')) //Logger 설정

//API 설계 및 구현4-1
app.use("/api", routes) // 제일먼저 구현

const CONNECT_URL = 'mongodb://localhost:27017/kor_dic_db3'

// mongoose.connect(CONNECT_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("mongodb connected ..."))
// . catch(e => console.log('failed to connect mongodb: ${e}'))

// app.get('/hello', (req, res) => {    //
//     res.send('root url')
// })
app.get('/hello', (req, res) => { //URL 응답 테스트
    res.send('hello world!')
})

app.use((req, res, next) => { //사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("Sorry can't find page")
    //404 페이지 전달
})

app.use((err, req, res, next) => { //서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server !")
})
//서버 배포
app.listen(process.env.PORT || 5000, () => { //5000 포트로 서버 오픈
    console.log('Server is running on port 5000...')
})




//미들웨어
// const points = [3, 4];
// const app = {} // 객체 리터러리
// app.doubleNums = (ponits) => { //프로퍼티 생성
//     return points.map(p => {
//         return p*p;
//     })
// } 
// app.sum = (points_doubled) => {
//     let s = 0;
//     points_doubled.forEach(p => {
//         s += p;
//     })
//     return s;
// }
// app.sq = (s) => {
//     return Math.sqrt(s)
// }

// const pipeline = [app.dobleNums, app.sum, app.sq]

// const result = app.sq(app.sum(app.doubleNums(points)))
// console.log(result)
