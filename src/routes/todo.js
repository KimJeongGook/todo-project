const express = require('express')
const TodoRouter = express.Router()

//특정 할일 생성
const Todo = require("../models/Todo");


TodoRouter.route('/').get( async (req, res) => {
    // res.send('all todo list')
    // 전체 할일 목록 조회
    const todos = await Todo.find()
    console.log(todos)
    res.json({status: 200, todos})
})

// 전체 할일목록을 조회하는 API 테스트
TodoRouter.route('/:id').get( (req, res) => {
    // res.send(`todo ${req.params.id}`)
    // 특정 할일 조회
    Todo.findById(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({status:200, todo})
    })
})

// 특정 할일을 조회하는 API 테스트
TodoRouter.route('/').post( (req, res) => {
    // res.send(`todo ${req.body.name} created`)
    Todo.findOne({name: req.body.name, done: false}, async(err, todo) => { // 중복 체크
        if(err) throw err;
        if(!todo){ // 데이터베이스에서 해당 할일을 조회하지 못한 경우
            const newTodo = new Todo(req.body);
            await newTodo.save().then( () => {
                res.json({status:201, msg:'new todo created in db !', newTodo})
            })
        } else{ // 생성하려는 할일과 같은 이름이고 아직 끝내지 않은 할일이 이미 데이터베이스에 존재하는 경우
            const msg = 'this todo already exists in db !'
            console.log(msg)
            res.json({status:204, msg})
        }
    })
})

TodoRouter.route('/:id').put( (req, res) => {
    // 데이터베이스 접속후 id 값으로 모델 조회하고 변경함
    // res.send(`todo ${req.params.id} updated`)
    // 특정 할일 변경
    Todo.findByIdAndUpdate(req.params.id,req.body,{new:true},(err, todo) =>{
        if(err) throw err;
        res.json({status:201,msg: `todo ${req.params.id} updated in db !`, todo})
    })
})

// 할일 삭제 delete
TodoRouter.route('/:id').delete((req, res) => {
    // res.send(`todo ${req.params.id} removed`)
    // 할일 삭제
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if(err) throw err;
        res.json({status:204, msg:`todo ${req.params.id} removed in db !`})
    })
})


module.exports = TodoRouter;
