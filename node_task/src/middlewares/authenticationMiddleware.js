import emailValidator from "deep-email-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const isPasswordAndConfirmdPasswordMatched = (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send({
      msg: "password mismatch the confirmed password.",
    });
  }
  if (!req.body.password || !req.body.confirmPassword) {
    return res.status(400).send({
      msg: "password or confirmPassword missing.",
    });
  }
  next();
}

const isPasswordvalid = (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).send({
      msg: "password or confirmPassword missing.",
    });
  }
  
  //Minimum eight characters, at least one letter, one number and one special character:
  const regexForPassword =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8}$/;
  if (!req.body.password.match(regexForPassword)) {
    return res.status(400).send({
      msg: "password does NOT match the rules",
    });
  }
  next();
};

const isPhoneNumberEnteredAndValid = (req, res, next) => {
  if (!req.body.phone) {
    return res.status(400).send({
      msg: "phone number is missing.",
    });
  }
  //should start with 07 and choose one of the options which is (7 or 8 or 9) and have a 7 digits also
  const regexForPhoneNumber = /^07[789]\d{7}$/;
  if (!req.body.phone.match(regexForPhoneNumber)) {
    return res.status(400).send({
      msg: "phone number is not correct.",
    });
  }
  next();
};

const isEmailValid = async (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({
      msg: "Email missing.",
    });
  }
  const { validators, reason } = await emailValidator.validate(req.body.email); //here is the problem timeout
  if (
    !validators["regex"]["valid"] ||
    !validators["typo"]["valid"] ||
    !validators["disposable"]["valid"] ||
    !validators["mx"]["valid"]
  ) {
    return res.status(400).send({
      msg: "Please provide a valid email address.",
      reason: validators[reason].reason,
    });
  }
  next();
};

const isEmailExist = async (req, res, next) => {
  const email = await req.db
    .collection("users")
    .findOne({ email: req.body.email });
  req.body.emailExistence = false;
  if (email) {
    req.body.emailExistence = true;
  }
  next();
};

const hashPassword = async (req, res, next) => {
  req.body.hashedPassword = await bcrypt.hash(req.body.password, 10);
  next();
};

const generateToken = (req, res, next) => {
  try{
    const payload = { email: req.body.email };
    const accessToken = jwt.sign(payload, process.env.PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: "1d",
    });
    req.body.accessToken = accessToken;
  } catch (error) {
    return res.send({'Error signing JWT:': error});
    // Handle the error, throw it, or log it depending on your needs
  }
  next();
};

const confirmPassword = async (req, res, next) => {
  const hash = await req.db
    .collection("users")
    .findOne({ email: req.body.email });
  const hashedPassword = hash["password"];
  bcrypt.compare(req.body.password, hashedPassword, function (err, result) {
    if (!result) {
      return res.status(400).send({
        msg: "password is incorrect.",
      });
    }
  });
  next();
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token == null) return res.status(401).send("you should supply a token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(403).send("you are not authorize");
    next();
  });
};

export {
  isPhoneNumberEnteredAndValid,
  isPasswordvalid,
  isEmailValid,
  isEmailExist,
  hashPassword,
  generateToken,
  verifyToken,
  confirmPassword,
  isPasswordAndConfirmdPasswordMatched
};
