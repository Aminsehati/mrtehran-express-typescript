import express from 'express'
import TrackController from '../../Controllers/Track/Track.controller'
import Authorization from '../../Middleware/Authorization'

const router = express.Router();




router.get('/', Authorization, TrackController.getTracks);
router.get('/:id', TrackController.getTrack);
router.put('/:id', TrackController.updateTrack);
router.post("/", TrackController.createTrack);
router.delete("/:id", TrackController.deleteTrack);
router.post("/:id/like", TrackController.likeTrack);
router.post("/:id/view", TrackController.viewTrack);
export default router