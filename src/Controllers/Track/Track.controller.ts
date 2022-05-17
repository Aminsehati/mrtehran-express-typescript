import { Request, Response } from 'express'
import TrackModel from '../../Model/track.model'
class TrackController {
    async getTracks(req: Request, res: Response) {
        try {
            const { limit, skip, like, view, trackName, createdAt } = req.body;
            const paginationItem = {
                limit: limit || 20,
                skip: skip || 1
            }
            let sortItem = {}
            if (like) {
                sortItem = {
                    ...sortItem,
                    like: Number(like)
                }
            }
            if (view) {
                sortItem = {
                    ...sortItem,
                    view: Number(view)
                }
            }
            if (trackName) {
                sortItem = {
                    ...sortItem,
                    trackName: Number(trackName)
                }
            }
            if (createdAt) {
                sortItem = {
                    ...sortItem,
                    createdAt: Number(createdAt)
                }
            }
            const items = await TrackModel.find({}, { __v: 0 }).limit(paginationItem.limit).
                skip((paginationItem.skip - 1) * (paginationItem.limit * paginationItem.skip)).sort(sortItem).
                populate([
                    {
                        path: "artists",
                        select: { '__v': 0 },
                    },
                    {
                        path: "playlists",
                        select: { '__v': 0 },
                    }
                ]);
            return res.json({
                isSuccess: true,
                data: {
                    items
                }
            })
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async getTrack(req: Request, res: Response) {
        try {
            const { id } = req.params;
            TrackModel.findOne({ _id: id }, { __v: 0 }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                return res.json({
                    isSuccess: true,
                    data: {
                        item: response
                    }
                })
            }).populate([{
                path: "artists",
                select: { '__v': 0 },
            }, {
                path: "playlists",
                select: { '__v': 0 },
            }])
        } catch (error) {
            return res.status(500).json({
                isSuccess: false,
                message: "خطایی  رخ داده است"
            })
        }
    }
    async updateTrack(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { imgUrl, audioUrl, trackName, artists, playlists } = req.body;
            if (!imgUrl || !audioUrl || !trackName || !artists || !playlists) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "All fields are required"
                })
            }
            TrackModel.findOneAndUpdate({ _id: id }, {
                imgUrl,
                audioUrl,
                trackName,
                artists: JSON.parse(artists),
                playlists: JSON.parse(playlists)
            }, (err: any, response: any) => {
                if (err) {
                    console.log(req.body);
                    return res.status(404).json({
                        isSuccess: false,
                        message: "All fields are required"
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
    async createTrack(req: Request, res: Response) {
        try {
            const { imgUrl, audioUrl, trackName, artists, playlists, hasPodcast } = req.body;
            if (!imgUrl || !audioUrl || !trackName || !artists || !playlists) {
                return res.status(400).json({
                    isSuccess: false,
                    message: "All fields are required"
                })
            }
            await TrackModel.create({
                imgUrl,
                audioUrl,
                trackName,
                artists: JSON.parse(artists),
                playlists: JSON.parse(playlists),
                hasPodcast
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
    async deleteTrack(req: Request, res: Response) {
        try {
            const { id } = req.params
            TrackModel.findOneAndDelete({ _id: id }, (err: any, response: any) => {
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
            return res.status(500).json({
                isSuccess: false,
                message: "An error has occurred"
            })
        }
    }
    async likeTrack(req: Request, res: Response) {
        try {
            const { id } = req.params;
            TrackModel.findOneAndUpdate({ _id: id }, {
                $inc: {
                    like: 1
                }
            }, (err: any, response: any) => {
                if (err) {
                    return res.status(404).json({
                        isSuccess: false,
                        message: "there are no results"
                    })
                }
                return res.json({
                    isSuccess: false,
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
    async viewTrack(req: Request, res: Response) {
        try {
            const { id } = req.params;
            TrackModel.findOneAndUpdate({ _id: id }, {
                $inc: {
                    view: 1
                }
            }, (err: any, response: any) => {
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
}
export default new TrackController()