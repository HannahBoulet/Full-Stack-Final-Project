import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user.models';

export default class AuthenticationController {
    register = (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.userName || !req.body.password) {
            return res
                .status(400)
                .json({ "error": "All fields required" });
        }
        const user = new User();
        user.userName = req.body.userName;
        user.setPassword(req.body.password);
        user.save()
            .then((user: IUser) => {
                const token = user.generateJwt();
                res
                    .status(200)
                    .json({ token, user });
            })
            .catch((error) => {
                console.error("Registration Error:", error);
                res.status(300).json({ error: "User registration failed: " + error.message });
            })
    };


    login = (req: Request, res: Response, next: NextFunction) => {
        if (!req.body.userName || !req.body.password) {
            return res
                .status(400)
                .json({ "message": "All fields required" });
        }
        console.log("pre authenticate")
        passport.authenticate('local', (error: any, user: any, info: any) => {
            console.log("in authenticate")
            if (user) {
                const token = user.generateJwt();
                res
                    .status(200)
                    .json({ token, user });
            } else {
                res
                    .status(401)
                    .json({ "message": "error here" });
            }
        })(req, res);
    };

    getUser(req: Request, res: Response, next: NextFunction) {
        User.findOne({ userName: req.params.userName })
            .then((user) => {
                if (user) {
                    res
                        .status(200)
                        .json({ user });
                } else {
                    res
                        .status(404)
                        .json({ message: "no user found" })
                }
            })
            .catch((error) => {
                res
                    .status(404)
                    .json({ message: "error retrieving user", error })
            })
    }
    getUserCart(req: Request, res: Response, next: NextFunction) {
        const { userName } = req.params;
        // Assuming the user's cart is stored in the user document in the database
        User.findOne({ userName })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                // Assuming the cart is an array of item IDs in the user document
                const cartItems = user.shoppingCart;
                res.status(200).json(cartItems);
            })
            .catch(err => {
                console.error("Error fetching user's cart:", err);
                res.status(500).json({ error: "Internal server error" });
            });
    }

    getUserOldCart(req: Request, res: Response, next: NextFunction) {
        const { userName } = req.params;
        // Assuming the user's cart is stored in the user document in the database
        User.findOne({ userName })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ error: "User not found" });
                }
                // Assuming the cart is an array of item IDs in the user document
                const oldItems = user.oldOrderCart;
                res.status(200).json(oldItems);
            })
            .catch(err => {
                console.error("Error fetching user's cart:", err);
                res.status(500).json({ error: "Internal server error" });
            });
    }







}
