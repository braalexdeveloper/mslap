const { Router }=require('express');

const router=Router();

const certificateController=require('../controllers/certificateController');

router.get('/observation/:id',certificateController.getObservation);
router.put('/observation/:id',certificateController.addObservation);

module.exports=router;