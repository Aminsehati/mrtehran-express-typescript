import express, { Request, Response, NextFunction } from 'express'
function Authorization(req: Request, res: Response, next: NextFunction) {
    try {
        next();
    } catch (error) {
        return res.status(500).json({
            isSuccess: false,
            message: "An error has occurred"
        })
    }
}
export default Authorization