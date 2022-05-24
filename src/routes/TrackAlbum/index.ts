import express from 'express'
const router = express.Router();
import TrackAlbumController from '../../Controllers/TrackAlbum/index.controller'
import TrackAlbumValidation from '../../validations/TrackAlbum/TrackAlbum.validation'
import checkValidations from '../../Middleware/checkValidations'
router.get("/", TrackAlbumController.getTracksAlbum);
router.get("/:id", TrackAlbumController.getTrackAlbum);
router.post("/", TrackAlbumValidation.createTrackAlbum(), checkValidations, TrackAlbumController.createTrackItem);
router.put("/:id", TrackAlbumValidation.updateTrackAlbum(), checkValidations, TrackAlbumController.updateTrackItem);
router.delete("/:id", TrackAlbumController.deleteTrackAlbum);
router.post("/:id/like", TrackAlbumController.likeTrackAlbum);
router.post("/:id/view", TrackAlbumController.viewTrackAlbum);
export default router