const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    setInterval(function () {
        console.log('second passed');
    }, 5000);
});

module.exports = router;