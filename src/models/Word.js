const mongoose = require('mongoose')

const wordSchema = mongoose.Schema({ //스키마 생성
    r_seq : {type: String, trim: true},
    r_word : {type: String, trim: true},
    r_link : {type: String, trim: true},
    r_chi : {type: String, trim: true}, // 한자
    r_des : {type: String, trim: true},
    r_pos : {type: String, trim: true}
})

const Word = mongoose.model('Word', wordSchema, 'kor_dic_coll') //초기화
module.exports = Word;

