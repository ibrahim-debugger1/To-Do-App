import { Router } from "express";
import { signIn, signUp } from "../services/authenticationService.js";
import {
  isEmailValid,
  isEmailExist,
  isPhoneNumberEnteredAndValid,
  isPasswordvalid,
  hashPassword,
  generateToken,
  verifyToken,
  confirmPassword,
  isPasswordAndConfirmdPasswordMatched
} from "../middlewares/authenticationMiddleware.js";

const signUpMiddleWares = [
  isEmailValid,
  isEmailExist,
  isPhoneNumberEnteredAndValid,
  isPasswordvalid,
  hashPassword,
  generateToken,
  isPasswordAndConfirmdPasswordMatched
];

const signInMiddleWares = [
  isEmailValid,
  isEmailExist,
  isPasswordvalid,
  confirmPassword,
  generateToken,
];

const router = Router();

router.post("/signup", signUpMiddleWares, (req, res) => {
  signUp(req.db, req.body).then((result) => {
    res.send(result);
  });
});

router.post("/signin", signInMiddleWares, (req, res) => {
  signIn(req.db, req.body).then((result) => {
    res.send(result);
  });
});

export default router;
