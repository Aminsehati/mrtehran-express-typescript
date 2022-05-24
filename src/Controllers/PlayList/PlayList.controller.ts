import express, { Request, Response, NextFunction } from 'express'
import playListModel from '../../Model/playlist.model'
class PlayListController {
    async getPlayLists(req: Request, res: Response, next: NextFunction) {
        try {
            const tottalCount = await playListModel.find().count();
            const { limit, skip, Followers, createdAt, name } = req.body;
            const pagination = {
                limit: limit || 20,
                skip: skip || 1
            }
            let sortItem = {};
            if (Followers) {
                sortItem = {
                    ...sortItem,
                    Followers: Number(Followers)
                }
            }
            if (createdAt) {
                sortItem = {
                    ...sortItem,
                    createdAt: Number(createdAt)
                }
            }
            if (name) {
                sortItem = {
                    ...sortItem,
                    name: Number(name)
                }
            }
            const items = await playListModel.find({}, { __v: 0 }).
                limit(pagination.limit).
                skip((pagination.skip - 1) * pagination.limit).
                sort(sortItem);
            res.json({
                isSuccess: true,
                data: {
                    items,
                    tottalCount
                }
            })
        } catch (error) {
            res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async getPlayList(req: Request, res: Response) {
        try {
            const { id } = req.params;
            playListModel.findOne({ _id: id }, { __v: 0 }, function (err: any, response: any) {
                if (err || response === null) {
                    res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                return res.json({
                    isSuccess: true,
                    data: {
                        response
                    }
                })
            });
        } catch (error) {
            res.status(400).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async createPlayList(req: Request, res: Response) {
        try {
            const { name, imgUrl, coverImgUrl } = req.body;
            playListModel.create({
                name,
                imgUrl,
                coverImgUrl
            }, (err: any) => {
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
            await playListModel.create({
                name,
                imgUrl,
                coverImgUrl
            })
            res.json({
                isSuccess: true,
                message: "Successfully registered"
            })
        } catch (error) {
            res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async updatePlayList(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, imgUrl, coverImgUrl } = req.body;
            if (!name || !imgUrl || !coverImgUrl) {
                playListModel.findOneAndUpdate({ _id: id }, {
                    name,
                    imgUrl,
                    coverImgUrl
                }, (err: any, response: any) => {
                    if (err || response === null) {
                        return res.status(400).json({
                            isSuccess: false,
                            message: "there are no results"
                        })
                    }
                    res.json({
                        isSuccess: true,
                        message: "Successfully registered"
                    })
                })
            }
        } catch (error) {
            res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async deletePlayList(req: Request, res: Response) {
        try {
            const { id } = req.params;
            playListModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
                if (err || response === null) {
                    res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                res.json({
                    isSuccess: false,
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
    async followPlayList(req: Request, res: Response) {
        try {
            const { id } = req.params
            playListModel.findOneAndUpdate({ _id: id }, {
                $inc: {
                    Followers: 1
                }
            }, (err: any, response: any) => {
                if (err || response === null) {
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
            res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
}
export default new PlayListController()