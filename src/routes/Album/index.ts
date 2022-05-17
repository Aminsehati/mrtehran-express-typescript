import express from 'express'
const router = express.Router();
import AlbumController from '../../Controllers/Albums/Album.controller'


router.get("/", AlbumController.getAlbums);
router.get("/:id", AlbumController.getAlbum);
router.post("/", AlbumController.createAlbum);
router.put("/:id", AlbumController.updateAlbum);
router.delete("/:id", AlbumController.deleteAlbum);
export default router