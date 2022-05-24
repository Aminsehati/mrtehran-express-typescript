import { body } from 'express-validator'
class AlbumValidation {
    createAlbum() {
        return [
            body('name').notEmpty().withMessage('Please enter a name').isString().withMessage("please just Enter string"),
            body('imgUrl').notEmpty().withMessage("Please enter a Image Url").isString().withMessage("please just Enter string")
        ]
    }
    updateAlbum() {
        return [
            body('name').notEmpty().withMessage('Please enter a name').isString().withMessage("please just Enter string"),
            body('imgUrl').notEmpty().withMessage("Please enter a Image Url").isString().withMessage('please just Enter string')
        ]
    }
    getAkbums() {
        return [
            body('name').custom((data) => {
                if (data) {
                    if (!['1', '-1'].includes(data)) {
                        throw new Error('Please Enter name 1 or -1')
                    }
                    return true
                }
                return true
            }),
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
        ]
    }
}
export default new AlbumValidation()