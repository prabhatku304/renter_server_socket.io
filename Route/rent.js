const express = require('express');
 const router  = express.Router();
 const {RentHandler,RentHistory}   =  require('../handlers/rent')




 router.post('/:id/rent',RentHandler);
router.get('/:id/rent/history',RentHistory)


module.exports = router;