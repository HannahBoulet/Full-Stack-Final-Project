import { NextFunction, Request, Response } from "express";
import User from '../models/user.models';
import Item from '../models/items.models';


export default class ShopCtrl {
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
        const itemId = req.params["itemId"];

        User.findOneAndUpdate({ userName: req.params["userName"] }, { $push: { shoppingCart: itemId } })
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
        const itemId = req.params["itemId"];

        User.findOneAndUpdate({ userName: req.params["userName"] }, { $pull: { shoppingCart: itemId } })
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
    //clears all items from cart
    clearCart = (req: Request, res: Response, next: NextFunction): void => {
        const userName = req.params["userName"];

        User.findOneAndUpdate({ userName: userName }, { $set: { shoppingCart: [] } })
            .then(() => {
                res.status(200).json({
                    message: "All items removed from the cart successfully"
                });
            })
            .catch((error) => {
                res.status(400).json({
                    message: "Failed to clear cart: " + error
                });
            });
    };

    getAllUsers = (req: Request, res: Response, next: NextFunction): void => {
        User.find()
            .then((users) => {
                res.status(200).json(users);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    }
    confirmOrder = (req: Request, res: Response, next: NextFunction): void => {
        const { userName, itemId } = req.params;

        User.findOneAndUpdate(
            { userName },
            { $addToSet: { oldOrderCart: itemId } },
            { new: true }
        )
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'Order confirmed successfully' });
            })
            .catch((error) => {
                res.status(400).json({ message: 'Failed to confirm order', error });
            });
    };






}

