import express from 'express';
import ApiCtrl from '../controllers/api';
import AuthCtrl from '../controllers/auth.controller';

const router = express.Router();
const apiCtrl = new ApiCtrl();
const authCtrl = new AuthCtrl();

router.route("/user/:userName").get(authCtrl.getUser);
router.route("/user/login").post(authCtrl.login);
router.route("/user/register").post(authCtrl.register);

router.route('/user/:userName/cart')
    .get(authCtrl.getUserCart);
router.route('/user/:userName/oldCart')
    .get(authCtrl.getUserOldCart);


router.route('/user')
    .get(apiCtrl.getAllUsers);

router.route('/items')
    .get(apiCtrl.getAllItems)
    .post(apiCtrl.addItem);

router.route('/clearcart/:userName')
    .delete(apiCtrl.clearCart);

router.route('/items/:itemName')
    .get(apiCtrl.getItem);

router.route('/items/id/:id')
    .get(apiCtrl.getItembyID);

router.route('/items/:id')
    .put(apiCtrl.updateItem)
    .delete(apiCtrl.deleteItem);

router.route('/user/:userName/items/:itemId')
    .put(apiCtrl.addItemToCart)
    .delete(apiCtrl.deleteItemFromCart);

router.route('/user/:userName/confirmOrder/:itemId').put(apiCtrl.confirmOrder);


export default router;