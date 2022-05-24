import express from 'express'
import TrackController from '../../Controllers/Track/Track.controller'
import Authorization from '../../Middleware/Authorization'
import trackValidation from '../../validations/Track/track.validation'
import checkValidations from '../../Middleware/checkValidations'

const router = express.Router();




router.get('/', trackValidation.getTracks() ,  checkValidations ,TrackController.getTracks);
router.get('/:id', TrackController.getTrack);
router.put('/:id', trackValidation.updateTrack(), checkValidations, TrackController.updateTrack);
router.post("/", trackValidation.createTrack(), checkValidations, TrackController.createTrack);
router.delete("/:id", TrackController.deleteTrack);
router.post("/:id/like", TrackController.likeTrack);
router.post("/:id/view", TrackController.viewTrack);
export default router