import express from 'express';
import ShopCtrl from '../controllers/shop.controller';
import AuthCtrl from '../controllers/auth.controller';

const router = express.Router();
const shopCtrl = new ShopCtrl();
const authCtrl = new AuthCtrl();

router.route("/user/:userName").get(authCtrl.getUser);
router.route("/user/login").post(authCtrl.login);
router.route("/user/register").post(authCtrl.register);

router.route('/user/:userName/cart')
    .get(authCtrl.getUserCart);
router.route('/user/:userName/oldCart')
    .get(authCtrl.getUserOldCart);


router.route('/user')
    .get(shopCtrl.getAllUsers);

router.route('/items')
    .get(shopCtrl.getAllItems)
    .post(shopCtrl.addItem);

router.route('/clearcart/:userName')
    .delete(shopCtrl.clearCart);

router.route('/items/:itemName')
    .get(shopCtrl.getItem);

router.route('/items/id/:id')
    .get(shopCtrl.getItembyID);

router.route('/items/:id')
    .put(shopCtrl.updateItem)
    .delete(shopCtrl.deleteItem);

router.route('/user/:userName/items/:itemId')
    .put(shopCtrl.addItemToCart)
    .delete(shopCtrl.deleteItemFromCart);

router.route('/user/:userName/confirmOrder/:itemId')
    .put(shopCtrl.confirmOrder);


export default router;