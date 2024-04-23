import express from 'express';
import ApiCtrl from '../controllers/api';
import AuthCtrl from '../controllers/auth.controller';

const router = express.Router();
const apiCtrl = new ApiCtrl();
const authCtrl = new AuthCtrl();

router.route("/user/:userName").get(authCtrl.getUser);
router.route("/user/login").post(authCtrl.login);
router.route("/user/register").post(authCtrl.register);
router.route("/user/profile/:userName").put(authCtrl.updateUser);


router.route('/user')
    .get(apiCtrl.getAllUsers);


router.route('/items')
    .get(apiCtrl.getAllItems)
    .post(apiCtrl.addItem);

router.route('/items/:itemName')
    .get(apiCtrl.getItem);

router.route('/items/id/:id')
    .get(apiCtrl.getItembyID);

router.route('/items/:id')
    .put(apiCtrl.updateItem)
    .delete(apiCtrl.deleteItem);

router.route('/user/:id/items/:itemId')
    .post(apiCtrl.addItemToCart)
    .delete(apiCtrl.deleteItemFromCart);




export default router;