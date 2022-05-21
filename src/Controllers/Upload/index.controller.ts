import { Request, Response } from 'express'
import path from 'path';
import fs from 'fs'
class UploadController {
    async uploadImage(req: Request, res: Response) {
        try {
            const typeimage = ['image/jpeg', 'image/png'];
            const mimetype = req.file?.mimetype || ""
            if (!typeimage.includes(mimetype)) {
                const fileName = req?.file?.filename || ""
                const addressFile = path.join(__dirname,`../../uploads/images/${fileName}`);
                fs.unlinkSync(addressFile);
                return res.status(400).json({
                    isSuccess: false,
                    message: "The file format is incorrect"
                })
            }
            if (!req.file) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "The uploaded file is incorrect"
                })
            }
            const prefixPath = path.join(__dirname, '../../');
            const file = req.file?.path.substring(prefixPath.length);
            res.json({
                isSuccess: true,
                data: {
                    file
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async uploadAudio(req: Request, res: Response) {
        try {
            const typeimage = ['audio/mpeg'];
            const mimetype = req.file?.mimetype || "";
            if (!typeimage.includes(mimetype)) {
                const fileName = req?.file?.filename || ""
                const addressFile = path.join(__dirname,`../../uploads/audio/${fileName}`);
                fs.unlinkSync(addressFile);
                return res.status(400).json({
                    isSuccess: false,
                    message: "The file format is incorrect"
                })
            }
            if (!req.file) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "The uploaded file is incorrect"
                })
            }
            const prefixPath = path.join(__dirname, '../../');
            const file = req.file?.path.substring(prefixPath.length);
            res.json({
                isSuccess: true,
                data: {
                    file
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
}
export default new UploadController();