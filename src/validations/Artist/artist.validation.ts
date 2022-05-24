import { body } from 'express-validator'
class ArtistValidation {
    getAritsts() {
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
            body('Followers').custom((data) => {
                if (data) {
                    if (!['1', '-1'].includes(data)) {
                        throw new Error('Please Enter Followers 1 or -1')
                    }
                    return true
                }
                return true
            }),
            body('name').custom((data) => {
                if (data) {
                    if (!['1', '-1'].includes(data)) {
                        throw new Error('Please Enter name 1 or -1')
                    }
                    return true
                }
                return true
            })
        ]
    }
    createAritst() {
        return [
            body('name').notEmpty().withMessage('Please enter a name').isString().withMessage("please just Enter string"),
            body('imgUrl').notEmpty().withMessage("Please enter a Image Url").isString().withMessage("please just Enter string"),
            body('coverImgUrl').notEmpty().withMessage("Please enter a coverImgUrl").isString().withMessage("please just Enter string"),
        ]
    }
    updateArtist() {
        return [
            body('name').notEmpty().withMessage('Please enter a name').isString().withMessage("please just Enter string"),
            body('imgUrl').notEmpty().withMessage("Please enter a Image Url").isString().withMessage("please just Enter string"),
            body('coverImgUrl').notEmpty().withMessage("Please enter a coverImgUrl").isString().withMessage("please just Enter string"),
        ]
    }
}
export default new ArtistValidation