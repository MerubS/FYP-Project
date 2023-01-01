const express = require('express')
const router = express.Router()

const {
    CreateCandidate,
} = require('../Controllers/CandidateController');

router.post('/CreateCandidate', CreateCandidate);
module.exports = router;