import { body } from "express-validator";
class TrackAlbumValidation {
    createTrackAlbum() {
        return [
            body('trackName').isEmpty().withMessage("Please Enter trackName").isString().withMessage("please just Enter string"),
            body('audioUrl').isEmpty().withMessage("Please Enter audioUrl").isString().withMessage("please Just Enter string"),
            body('album').isEmpty().withMessage("Please Enter album").isString().withMessage("please just Enter string")
        ]
    }
    updateTrackAlbum() {
        return [
            body('trackName').isEmpty().withMessage("Please Enter trackName").isString().withMessage("please just Enter string"),
            body('audioUrl').isEmpty().withMessage("Please Enter audioUrl").isString().withMessage("please Just Enter string"),
            body('album').isEmpty().withMessage("Please Enter album").isString().withMessage("please just Enter string")
        ]
    }
    getTracks() {
        return [
            body('createdAt').custom((data) => {
                if (data) {
                    if (!['1', '-1'].includes(data)) {
                        throw new Error('Please Enter createdAt 1 or -1')
                    }
                    return true
                }
                return true
            }),
            body('limit').custom((data) => {
                if (data) {
                    var pattern = /^(0|([1-9]\d*))$/;
                    if (!pattern.test(data)) {
                        throw new Error('Please Enter Right limit')
                    }
                    return true
                }
                return true
            }),
            body('skip').custom((data) => {
                if (data) {
                    var pattern = /^(0|([1-9]\d*))$/;
                    if (!pattern.test(data)) {
                        throw new Error('Please Enter Right skip')
                    }
                    return true
                }
                return true
            }),
            body('like').custom((data) => {
                if (data) {
                    if (!['1', '-1'].includes(data)) {
                        throw new Error('Please Enter like 1 or -1')
                    }
                    return true
                }
                return true
            }),
            body('view').custom((data) => {
                if (data) {
                    if (!['1', '-1'].includes(data)) {
                        throw new Error('Please Enter view 1 or -1')
                    }
                    return true
                }
                return true
            }),
            body('trackName').custom((data) => {
                if (data) {
                    if (!['1', '-1'].includes(data)) {
                        throw new Error('Please Enter trackName 1 or -1')
                    }
                    return true
                }
                return true
            })
        ]
    }
}
export default new TrackAlbumValidation()