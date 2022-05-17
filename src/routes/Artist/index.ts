import express from 'express'
import AritstController from '../../Controllers/Artist/Artist.controller'
const router = express.Router();


router.get("/", AritstController.getAritsts);
router.get("/:id", AritstController.getAritst);
router.post("/", AritstController.createArtist);
router.put("/:id", AritstController.updateArtist);
router.delete("/:id", AritstController.deleteArtist);
router.post("/:id/follow", AritstController.followArtist);
export default router