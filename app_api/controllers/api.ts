import { NextFunction, Request, Response } from "express";
import User from '../models/user.models';
import Item from '../models/items.models';
export default class ApiCtrl {


    //item logic
    getAllItems = (req: Request, res: Response, next: NextFunction): void => {
        Item.find()
            .then((items) => {
                res.status(200).json(items);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
    getItem = (req: Request, res: Response, next: NextFunction): void => {
        Item.findOne({ itemName: req.params["itemName"] })
            .then((item) => {
                if (!item) {
                    res.status(404).json({
                        item: undefined,
                        message: `Could not find item with name `
                    })
                } else {
                    res.status(200).json({
                        item,
                        message: 'Retrieved item'
                    })
                }
            })
            .catch((error) => {
                res.status(400)
            });
    }

    getItembyID = (req: Request, res: Response, next: NextFunction): void => {
        Item.findById(req.params["id"])
            .then((item) => {
                if (!item) {
                    res.status(404).json({
                        item: undefined,
                        message: `Could not find item with Id `
                    })
                } else {
                    res.status(200).json({
                        item,
                        message: 'Retrieved item with that ID'
                    })
                }
            })
            .catch((error) => {
                res.status(400)
            });
    }

    addItem = (req: Request, res: Response, next: NextFunction): void => {
        const { itemName, image, description, price } = req.body;

        const item = new Item({ itemName, image, description, price });
        item.save()
            .then((item) => {
                res.status(201).json(item);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
    updateItem = (req: Request, res: Response, next: NextFunction): void => {
        Item.findByIdAndUpdate(req.params["id"], {
            itemName: req.body["itemName"],
            image: req.body["image"],
            description: req.body["description"],
            price: req.body["price"]
        })
            .then(() => {
                res.status(200).json({
                    message: "success"
                })
            })
            .catch((error) => {
                res.status(400).json({
                    message: "failure: " + error
                })
            })


    }
    deleteItem = (req: Request, res: Response, next: NextFunction) => {
        Item.findByIdAndDelete(req.params["id"])
            .then(() => {
                res.status(200).json({
                    message: "Item deleted successfully"
                })
            })
            .catch((error) => {
                res.status(400).json({
                    message: "error retrieving Item: " + error
                })
            })
    }
    //cart logic
    // Inside the addItemToCart method:

    addItemToCart = (req: Request, res: Response, next: NextFunction): void => {
        const userId = req.params["id"];
        const itemId = req.params["itemId"];

        User.findByIdAndUpdate(userId, { $push: { shoppingCart: itemId } })
            .then(() => {
                res.status(200).json({
                    message: "Item added to the cart successfully"
                });
            })
            .catch((error) => {
                res.status(400).json({
                    message: "Failed to add item to the cart: " + error
                });
            });
    }
    deleteItemFromCart = (req: Request, res: Response, next: NextFunction): void => {
        const userId = req.params["id"];
        const itemId = req.params["itemId"];

        User.findByIdAndUpdate(userId, { $pull: { shoppingCart: itemId } })
            .then(() => {
                res.status(200).json({
                    message: "Item removed from the cart successfully"
                });
            })
            .catch((error) => {
                res.status(400).json({
                    message: "Failed to remove item from the cart: " + error
                });
            });
    }
    //users
    //update user logic  where user can change their password
    getAllUsers = (req: Request, res: Response, next: NextFunction): void => {
        User.find()
            .then((users) => {
                res.status(200).json(users);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
    addUser = (req: Request, res: Response, next: NextFunction): void => {
        const { userName, password } = req.body;

        const user = new User({ userName, password });
        user.save()
            .then((user) => {
                res.status(201).json(user);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }

    getUserById = (req: Request, res: Response, next: NextFunction) => {
        User.findById(req.params["id"])
            .then((user) => {
                if (!user) {
                    res.status(400).json({
                        user: undefined,
                        message: `could not find user with id: ${req.params["id"]}`
                    })
                } else {
                    res.status(200).json({
                        user,
                        message: 'retrieved user'
                    })
                }
            })
            .catch((error) => {
                res.status(400).json({
                    message: "error retrieving user: " + error
                })
            })
    }


}

