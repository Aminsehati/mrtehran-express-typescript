import express from 'express'
import AritstController from '../../Controllers/Artist/Artist.controller'
import ArtistValidation from '../../validations/Artist/artist.validation'
import checkValidations from '../../Middleware/checkValidations'
const router = express.Router();


router.get("/", ArtistValidation.getAritsts(), checkValidations, AritstController.getAritsts);
router.get("/:id", AritstController.getAritst);
router.post("/", ArtistValidation.createAritst(), checkValidations, AritstController.createArtist);
router.put("/:id", ArtistValidation.updateArtist(), checkValidations, AritstController.updateArtist);
router.delete("/:id", AritstController.deleteArtist);
router.post("/:id/follow", AritstController.followArtist);
export default router