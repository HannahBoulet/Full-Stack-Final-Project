import express from 'express';
import { auth } from '../middleware/auth';
import ShopCtrl from '../controllers/shop.controller';

const router = express.Router();
const shopCtrl = new ShopCtrl();

router.route('/user')
    .get(shopCtrl.getAllUsers);

router.route('/items')
    .get(shopCtrl.getAllItems)
    .post(shopCtrl.addItem);

router.route('/clearcart/:userName')
    .delete(auth, shopCtrl.clearCart);

router.route('/items/:itemName')
    .get(shopCtrl.getItem);

router.route('/items/id/:id')
    .get(shopCtrl.getItembyID);

router.route('/items/:id')
    .put(shopCtrl.updateItem)
    .delete(shopCtrl.deleteItem);

router.route('/user/:userName/items/:itemId')
    .put(auth, shopCtrl.addItemToCart)
    .delete(auth, shopCtrl.deleteItemFromCart);

router.route('/user/:userName/confirmOrder/:itemId')
    .put(auth, shopCtrl.confirmOrder);


export default router;