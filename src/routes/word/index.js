const express = require('express')
const WordRouter = express.Router()

const Word = require('../../models/Word') // word 가져옴

//처리로직
// /api/word/ , /api/words/학원 //(파라미터)
WordRouter.route('/(:word)?').get( async (req, res) => {
    let words = []
    const {word} = req.params
    // const queries = word.split(',')
    // console.log(queries) //배열

    if(word !== "undefined" && word !== undefined){ // 데이터베이스에서 쿼리 단어를 검색
        console.log(word)
        
        try{
            //안됨 words = await Word.find({r_des: {$in: [queries]}})
            // console.log('단어 쿼리...')
            // words = await Word.find({ r_des: {$in: [
            //     {$regex: "법규"},
            //     {$regex: "계속"}
            // ]}})
            // words = await Word.find({r_word: word})
        
        //데이터 베이스에서 검색어로 시작하는 단어를 검색
            // words = await Word.find({r_word: {$regex:`^${word}`}
        //데이터 베이스에서 검색어로 끝나는 단어를 검색
            // words = await Word.find({r_word: {$regex: `${word}$`}})
        // 내용에서 단어를 검색
            // words = await Word.find({r_des: {$regex: `${word}`}})
        
//우서 주석처리
            words = await Word.find({
                $or: [
                    {r_word: {$regex: `${word}`}},
                    {r_des: {$regex: `${word}`}}
                ]
            }).sort({"_id": 1}) // -1 : 최신순(내림차순), 1 : 과거순(오름차순)
            .limit(100) // 검색중 6개만 출력
//주석
            // words = [ { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", }, { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", } ]


        } catch(e){
            console.log(e)
        }
    } else { // 데이터베이스에서 전체 단어 검색
        console.log(word)
        // words = ["no query"]
        // console.log(`word database: ${Word}`)
        try {

//우서 주석처리
            words = await Word.find() // 전체 DB 조회

            // words = [ { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", }, { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", }, { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", }, { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", }, { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", }, { r_seq: "1", r_word: "학원", r_link: "https//google.com", r_chi: "한자", r_des: "학원은 지루하다", r_pos: "포스", } ]


        } catch(e){
            console.log(e)
        }
    }
    res.json({status:200, words})
}) 

module.exports = WordRouter