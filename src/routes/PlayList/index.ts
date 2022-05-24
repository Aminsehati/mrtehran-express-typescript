import express, { Express, Router } from 'express'
import PlayListController from '../../Controllers/PlayList/PlayList.controller'
import PlayListValidation from '../../validations/playList/playlist.validation'
import checkValidations from '../../Middleware/checkValidations'
const router = express.Router();

router.get("/", PlayListValidation.getPlayLists(), checkValidations, PlayListController.getPlayLists);
router.get("/:id", PlayListController.getPlayList);
router.post("/", PlayListValidation.createPlayList(), checkValidations, PlayListController.createPlayList);
router.put("/:id", PlayListValidation.updatePlayList(), checkValidations, PlayListController.updatePlayList);
router.delete("/:id", PlayListController.deletePlayList);
router.post("/:id/follow", PlayListController.followPlayList)
export default router