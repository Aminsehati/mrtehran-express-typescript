import { Request, Response } from 'express'
import { Result, ValidationError, validationResult } from 'express-validator';
import ArtistModel from '../../Model/artist.model'
class ArtistController {
    async getAritsts(req: Request, res: Response) {
        try {
            const { limit, skip, Followers, name, createdAt } = req.body;
            const paginationItem = {
                limit: limit || 20,
                skip: skip || 1
            }
            let sortItem = {}
            if (Followers) {
                sortItem = {
                    ...sortItem,
                    Followers: Number(Followers)
                }
            }
            if (name) {
                sortItem = {
                    ...sortItem,
                    name: Number(name)
                }
            }
            if (createdAt) {
                sortItem = {
                    ...sortItem,
                    createdAt: Number(createdAt)
                }
            }
            const items = await ArtistModel.find({}, { __v: 0 }).
                limit(paginationItem.limit).
                skip((paginationItem.skip - 1) * (paginationItem.limit)).
                sort(sortItem);
            const tottalCount = await ArtistModel.find().count();
            res.json({
                isSuccess: true,
                data: {
                    items,
                    tottalCount
                }
            })
        } catch (error) {
            res.json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async getAritst(req: Request, res: Response) {
        try {
            const { id } = req.params;
            ArtistModel.findOne({ _id: id }, { __v: 0 }, (err: any, response: any) => {
                if (err || response === null) {
                    return res.status(400).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                } else {
                    return res.json({
                        isSuccess: true,
                        data: {
                            item: response
                        }
                    })
                }
            })
        } catch (error) {
            res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async createArtist(req: Request, res: Response) {
        try {
            const { name, imgUrl, coverImgUrl } = req.body;
            await ArtistModel.create({
                name,
                imgUrl,
                coverImgUrl
            });
            res.json({
                isSuccess: true,
                message: "Successfully registered"
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async updateArtist(req: Request, res: Response) {
        try {
            const { id } = req.params
            const { name, imgUrl, coverImgUrl } = req.body;
            ArtistModel.findOneAndUpdate({ _id: id }, { name, imgUrl, coverImgUrl }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "Successfully registered"
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async deleteArtist(req: Request, res: Response) {
        try {
            const { id } = req.params
            ArtistModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                return res.json({
                    isSuccess: true,
                    message: "Successfully removed"
                })
            })
        } catch (error) {
            res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async followArtist(req: Request, res: Response) {
        try {
            const { id } = req.params;
            ArtistModel.findOneAndUpdate({ _id: id }, {
                $inc: {
                    Followers: 1
                }
            }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                res.json({
                    isSuccess: true,
                    message: "Successfully registered"
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
}
export default new ArtistController();