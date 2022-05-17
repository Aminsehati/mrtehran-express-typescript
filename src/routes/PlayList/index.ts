import express, { Express, Router } from 'express'
import PlayListController from '../../Controllers/PlayList/PlayList.controller'
const router = express.Router();

router.get("/", PlayListController.getPlayLists);
router.get("/:id",PlayListController.getPlayList);
router.post("/",PlayListController.createPlayList);
router.put("/:id",PlayListController.updatePlayList);
router.delete("/:id",PlayListController.deletePlayList);
router.post("/:id/follow",PlayListController.followPlayList)
export default router