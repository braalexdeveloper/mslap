const { Router }=require('express');

const router=Router();

const certificateController=require('../controllers/certificateController');

router.get('/observation/:id',certificateController.getObservation);
router.put('/observation/:id',certificateController.addObservation);
router.put('/validate/:id',certificateController.validateCertificate);

module.exports=router;