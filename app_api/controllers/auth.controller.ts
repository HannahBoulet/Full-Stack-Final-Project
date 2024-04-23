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
    updateUser = (req: Request, res: Response, next: NextFunction) => {
        const { userName, newPassword } = req.body;

        // Check if both username and new password are provided
        if (!userName || !newPassword) {
            return res.status(400).json({ "error": "Username and new password are required" });
        }

        // Find the user by username
        User.findOne({ userName })
            .then((user: IUser | null) => {
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }

                // Set the new password for the user
                user.setPassword(newPassword);

                // Save the updated user
                user.save()
                    .then((updatedUser: IUser) => {
                        res.status(200).json({ message: "Password updated successfully", updatedUser });
                    })
                    .catch((error: any) => {
                        res.status(500).json({ error: "Error updating password", message: error.message });
                    });
            })
            .catch((error: any) => {
                res.status(500).json({ error: "Error finding user", message: error.message });
            });
    };








}
