const express = require('express')
const router = express.Router()

const {
    CreateQuestion,
    UpdateQuestion,
    DeleteQuestion,
    getAllQuestion,
    getQuestionbyId
} = require('../Controllers/QuestionController')

router.get('/getAllQuestion', getAllQuestion);
router.get('/getQuestionbyId', getQuestionbyId);
router.get('/DeleteQuestion', DeleteQuestion);
router.post('/CreateQuestion', CreateQuestion);
router.post('/UpdateQuestion', UpdateQuestion);

module.exports = router;