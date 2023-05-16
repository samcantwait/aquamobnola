const express = require('express');
const router = express.Router();
const controller = require('../controllers/processes')

router.get('/', controller.renderHome);

router.post("/subscribe", controller.subscribe);

router.post("/check-form", controller.checkForm);

router.post("/contact", controller.contact);

router.get('/gallery/', controller.showGallery);

router.post("/gallery", controller.sortGallery);

router.use(controller.send404);


module.exports = router;