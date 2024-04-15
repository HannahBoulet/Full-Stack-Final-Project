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

router.route('/items/:itemName')
    .get(apiCtrl.getItem);

router.route('/items/:id')
    .put(apiCtrl.updateItem)
    .delete(apiCtrl.deleteItem);

router.route('/user/:id/items/:itemId')
    .post(apiCtrl.addItemToCart)
    .delete(apiCtrl.deleteItemFromCart);


export default router;