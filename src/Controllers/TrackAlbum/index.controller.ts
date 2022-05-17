import { Request, Response } from 'express'
import trackAlbumModel from '../../Model/trackAlbum.model'
import albumModel from '../../Model/album.model'
class TrackAlbumController {
    async getTracksAlbum(req: Request, res: Response) {
        try {
            const { view, limit, skip, like, createdAt, artist } = req.body;
            let paginationItem = {
                limit: limit || 20,
                skip: skip || 1
            };
            let sortItem = {}
            if (view) {
                sortItem = {
                    ...sortItem,
                    view: Number(view)
                }
            }
            if (like) {
                sortItem = {
                    ...sortItem,
                    like: Number(like)
                }
            }
            if (createdAt) {
                sortItem = {
                    ...sortItem,
                    createdAt: Number(createdAt)
                }
            }
            const tottalCount = await trackAlbumModel.find().count();
            if (artist) {
                const album = await albumModel.findOne({ artists: artist });
                const tracksAlbum = album._id && await trackAlbumModel.find({ album: album._id }, { __v: 0 }).
                    populate({
                        path: "album",
                        select: { __v: 0 },
                        populate: {
                            path: "artists",
                            select: { __v: 0 }
                        }
                    }).
                    limit(paginationItem.limit).
                    skip((paginationItem.limit) * (paginationItem.skip - 1))
                    .sort(sortItem);
                return res.json({
                    isSuccess: true,
                    data: {
                        items: tracksAlbum,
                        tottalCount
                    }
                })
            }
            const items = await trackAlbumModel.find({}, { __v: 0 })
                .populate({
                    path: "album",
                    select: { __v: 0 },
                    populate: {
                        path: "artists",
                        select: { __v: 0 }
                    }
                }).
                limit(paginationItem.limit).
                skip((paginationItem.limit) * (paginationItem.skip - 1))
                .sort(sortItem)
            res.json({
                isSuccess: true,
                data: {
                    items,
                    tottalCount
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async getTrackAlbum(req: Request, res: Response) {
        try {
            const { id } = req.params;
            trackAlbumModel.findOne({ _id: id }, { __v: 0 }, (err: any, response: any) => {
                if (err || response === null) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                return res.json({
                    isSuccess: false,
                    data: {
                        item: response
                    }
                })
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async createTrackItem(req: Request, res: Response) {
        try {
            const { trackName, audioUrl, album } = req.body;
            if (!trackName || !audioUrl || !album) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "All fields are required"
                })
            }
            await trackAlbumModel.create({
                trackName,
                audioUrl,
                album
            })
            return res.json({
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
    async updateTrackItem(req: Request, res: Response) {
        try {
            const { trackName, audioUrl, album } = req.body;
            const { id } = req.params;
            if (!trackName || !audioUrl || !album) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "All fields are required"
                })
            }
            trackAlbumModel.findOneAndUpdate({ _id: id }, { trackName, audioUrl, album }, (err: any, response: any) => {
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
    async deleteTrackAlbum(req: Request, res: Response) {
        try {
            const { id } = req.params;
            trackAlbumModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
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
            return res.json({
                isSuccess: true,
                message: "Successfully registered"
            })
        }
    }
    async likeTrackAlbum(req: Request, res: Response) {
        try {
            const { id } = req.params;
            trackAlbumModel.findOneAndUpdate({ _id: id }, {
                $inc: {
                    like: 1
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
            return res.status(500).json({
                isSuccess: true,
                message: "Successfully registered"
            })
        }
    }
    async viewTrackAlbum(req: Request, res: Response) {
        try {
            const { id } = req.params;
            trackAlbumModel.findOneAndUpdate({ _id: id }, {
                $inc: {
                    view: 1
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
            return res.status(500).json({
                isSuccess: true,
                message: "Successfully registered"
            })
        }
    }
}
export default new TrackAlbumController();