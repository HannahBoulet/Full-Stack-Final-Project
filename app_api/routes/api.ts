import express from 'express';
import ApiCtrl from '../controllers/api';

const router = express.Router();
const apiCtrl = new ApiCtrl();

router.route('/user')
    .get(apiCtrl.getAllUsers)
    .post(apiCtrl.addUser);

router.route("/user/:id")
    .get(apiCtrl.getUserById);

router.route('/items')
    .get(apiCtrl.getAllItems)
    .post(apiCtrl.addItem);

router.route('/items/:id')
    .get(apiCtrl.getItem)
    .put(apiCtrl.updateItem);

router.route("/user/:userId/cart")
    .post(apiCtrl.addToCart)
    .get(apiCtrl.getCartItems);

router.route('/user/:userId/cart/:id')
    .delete(apiCtrl.deleteCartItem);


export default router;