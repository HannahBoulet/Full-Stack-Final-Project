import { NextFunction, Request, Response } from "express";
import User from '../models/user.models';
import Item from '../models/items.models';
import CartItem from '../models/cart.models';
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
        const itemId = req.params.id;

        Item.findById(itemId)
            .then((item) => {
                if (!item) {
                    res.status(404).json({
                        item: undefined,
                        message: `Could not find item with id: ${itemId}`
                    });
                } else {
                    res.status(200).json({
                        item,
                        message: 'Retrieved item'
                    });
                }
            })
            .catch((error) => {
                res.status(400).json({ message: `Error retrieving item: ${error.message}` });
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

    //Cart
    getCartItems = (req: Request, res: Response, next: NextFunction) => {
        CartItem.find({ user: req.params["userId"] }).populate('item')
            .then((cartItems) => {
                res.status(200).json(cartItems);
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            });
    }

    //need to fix where if user adds same item it adds to quantity
    addToCart = (req: Request, res: Response, next: NextFunction) => {
        const { user, item } = req.body; // Assuming the user and item IDs are provided in the request body

        User.findById(user) // Assuming the user ID is provided in the request body
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                return CartItem.create({ user: user._id, item }); // Assuming item is already a valid ObjectId
            })
            .then(() => {
                res.status(200).json({ message: 'Item added to cart successfully' });
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            });
    }


    deleteCartItem = (req: Request, res: Response, next: NextFunction): void => {
        const { id } = req.params;

        CartItem.findByIdAndDelete(id)
            .then(() => {
                res.status(204).send();
            })
            .catch((error) => {
                res.status(400).json({ message: `Error deleting cart item: ${error.message}` });
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

