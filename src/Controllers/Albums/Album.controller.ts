import { Request, Response } from 'express'
import albumModel from '../../Model/album.model'
export class AlbumController {
    async getAlbums(req: Request, res: Response) {
        try {
            const { limit, skip, name, createdAt  } = req.body;
            const paginationItem = {
                limit: limit || 20,
                skip: skip || 1,
            }
            let sortItem = {};
            if (name) {
                sortItem = {
                    ...sortItem,
                    name: Number(name)
                }
            }
            if(createdAt){
                sortItem = {
                    ...sortItem,
                    createdAt: Number(createdAt)
                }
            }
            const items = await albumModel.find({}, { __v: 0 }).
                limit(paginationItem.limit).
                skip((paginationItem.skip - 1) * (paginationItem.limit)).
                sort(sortItem).
                populate({
                    path: "artists",
                    select: { __v: 0 }
                });
            const tottalCount = await albumModel.find().count();
            return res.json({
                isSuccess: true,
                data: {
                    items,
                    tottalCount
                }
            })
        } catch (error) {
            res.status(500).json({
                isSuccess: true,
                message: "An error has occurred"
            })
        }
    }
    async getAlbum(req: Request, res: Response) {
        try {
            const { id } = req.params;
            albumModel.findOne({ _id: id }, (err: any, response: any) => {
                if (err) {
                    res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                } else {
                    res.json({
                        isSuccess: true,
                        data: {
                            item: response
                        }
                    })
                }
            }).populate('artists')
        } catch (error) {
            return res.status(500).json({
                isSuccess: true,
                message: "An error has occurred"
            })
        }
    }
    async createAlbum(req: Request, res: Response) {
        try {
            const { name, imgUrl, artists } = req.body;
            if (!name || !imgUrl) {
                res.status(400).json({
                    isSuccess: false,
                    message: "All fields are required"
                })
            }
            await albumModel.create({
                name,
                imgUrl,
                artists: JSON.parse(artists)
            });
            res.json({
                isSuccess: true,
                message: "Successfully registered"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async updateAlbum(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, imgUrl, artists } = req.body;
            if (!name || !imgUrl || !artists) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "All fields are required"
                })
            }
            albumModel.findOneAndUpdate({ _id: id }, { name, imgUrl, artists: JSON.parse(artists) }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                } else {
                    return res.json({
                        isSuccess: false,
                        message: "Successfully registered"
                    })
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async deleteAlbum(req: Request, res: Response) {
        try {
            const { id } = req.params
            albumModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                } else {
                    return res.json({
                        isSuccess: true,
                        message: "Successfully removed"
                    })
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
export default new AlbumController()