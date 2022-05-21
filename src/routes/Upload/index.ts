import express from 'express'
const router = express.Router();
import UploadController from '../../Controllers/Upload/index.controller'
import uploadUtils from '../../utils/upload-utils'

router.post("/Image", uploadUtils.uploadImage('images').single('file'), UploadController.uploadImage);
router.post("/Audio", uploadUtils.uploadImage('audio').single('file'), UploadController.uploadAudio);

export default router