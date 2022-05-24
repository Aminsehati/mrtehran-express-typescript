import { body } from "express-validator";
class TrackValidation {
    createTrack() {
        return [
            body('imgUrl').notEmpty().withMessage("Please Enter imgUrl").isString().withMessage("please Just Enter String"),
            body('audioUrl').notEmpty().withMessage("Please Enter audioUrl").isString().withMessage("please Just Enter String"),
            body('trackName').notEmpty().withMessage("Please Enter trackName").isString().withMessage("please Just Enter String"),
            body("artists").custom(data=>{
                if(data && Array.isArray(data)){
                    return true 
                }
                throw 'Please just Enter Array'
            })
        ]
    }
    updateTrack() {
        return [
            body('imgUrl').notEmpty().withMessage("Please Enter imgUrl").isString().withMessage("please Just Enter String"),
            body('audioUrl').notEmpty().withMessage("Please Enter audioUrl").isString().withMessage("please Just Enter String"),
            body('trackName').notEmpty().withMessage("Please Enter trackName").isString().withMessage("please Just Enter String")
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
export default new TrackValidation()