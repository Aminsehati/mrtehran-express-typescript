import express from 'express'
const router = express.Router();
import TrackAlbumController from '../../Controllers/TrackAlbum/index.controller'
router.get("/", TrackAlbumController.getTracksAlbum);
router.get("/:id", TrackAlbumController.getTrackAlbum);
router.post("/", TrackAlbumController.createTrackItem);
router.put("/:id", TrackAlbumController.updateTrackItem);
router.delete("/:id", TrackAlbumController.deleteTrackAlbum);
router.post("/:id/like", TrackAlbumController.likeTrackAlbum);
router.post("/:id/view", TrackAlbumController.viewTrackAlbum);
export default router