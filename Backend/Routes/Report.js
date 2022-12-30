const express = require('express')
const router = express.Router()

const {
    CreateReport,
    getAllReport
} = require('../Controllers/ReportController')

router.get('/getAllReport', getAllReport);
router.post('/CreateReport', CreateReport);

module.exports = router;