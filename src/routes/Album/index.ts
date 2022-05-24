import express from 'express'
const router = express.Router();
import AlbumController from '../../Controllers/Albums/Album.controller'
import albumValidation from '../../validations/album/album.validation';
import checkValidations from '../../Middleware/checkValidations'


router.get("/", albumValidation.getAkbums(), checkValidations, AlbumController.getAlbums);
router.get("/:id", AlbumController.getAlbum);
router.post("/", albumValidation.createAlbum(), checkValidations, AlbumController.createAlbum);
router.put("/:id", albumValidation.updateAlbum(), checkValidations, AlbumController.updateAlbum);
router.delete("/:id", AlbumController.deleteAlbum);
export default router