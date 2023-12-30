const { Router } = require("express");

const { schemas } = require("../../models/user");
const { validateBody } = require("../../decorators");
const AuthController = require("../../controllers/auth");
const { authenticate, upload, uploadImage } = require("../../middlewares");
const router = Router();
// console.log("Зашел в роутер");
//________________________________

const { getTest } = require('../../queries/users/get-test')
const { getAllUsers } = require('../../queries/users/get-all')


router.get('/test', getTest)


router.get('/all', getAllUsers)

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  AuthController.register
);

router.get("/verify/:verificationToken", AuthController.verify);

router.post(
  "/verify",
  validateBody(schemas.userEmailSchema),
  AuthController.resendVerify
);

router.post("/login", validateBody(schemas.loginSchema), AuthController.login);

router.get("/current", authenticate, AuthController.getCurrent);

router.post("/logout", authenticate, AuthController.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  AuthController.updateAvatar
);

router.put(
  "/:id",
  validateBody(schemas.registerSchema),
  AuthController.updateUserData
);

router.patch(
  "/user",
  authenticate,
  validateBody(schemas.updateSubscriptionSchema),
  AuthController.updateSubscription
);

router.patch(
  "/update",
  authenticate,
  uploadImage.single("avatarURL"),
  AuthController.updateUser
);

module.exports = router;
