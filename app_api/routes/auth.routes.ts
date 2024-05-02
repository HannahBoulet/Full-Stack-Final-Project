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

export default router;