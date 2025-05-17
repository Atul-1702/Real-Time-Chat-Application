const router = require("express").Router();
const { signup, signin } = require("../controllers/auth.controller");
const asyncFuncErrorHandler = require("../utils/asyncFuncErrorHandler");

router.post("/signup", asyncFuncErrorHandler(signup));
router.post("/signin", asyncFuncErrorHandler(signin));

module.exports = router;
