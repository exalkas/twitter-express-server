import User from "../models/User.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import sendEmail from "../utilities/email.js";
// import sendEmailDynamic from "../utilities/emailDynamic.js";
import { validationResult } from "express-validator";

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
  try {
    console.log("🚀 ~ hello register ", req.body);

    const errors = validationResult(req);
    console.log("🚀 ~ errors", errors);

    if (!errors.isEmpty()) {
      // !errors.isEmpty() => there are errors
      return res.send({ success: false, errors: errors.array() });
    }

    // if (!req.body.username || !req.body.email) return res.send({success: false, errorId: 0})

    // if (req.body.username.length < 3) return res.send({success: false, errorId: 2})

    // const salt = await bcrypt.genSalt(SALT_ROUNDS)

    // const hashedPass = await bcrypt.hash(req.body.password, salt)
    // console.log("🚀 ~ register ~ hashedPass", hashedPass)

    // req.body.password = hashedPass

    const user = await User.create(req.body);
    console.log("🚀 ~ register ~ user", user);

    // const token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: '1h'})

    // sendEmail(token)

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ register ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    console.log("🚀 ~ hello login ", req.body);

    const errors = validationResult(req);
    console.log("🚀 ~ errors", errors);

    if (!errors.isEmpty()) {
      // !errors.isEmpty() => there are errors
      return res.send({ success: false, errors: errors.array() });
    }

    const user = await User.findOne({
      $or: [
        { username: req.body.emailOrUsername },
        { email: req.body.emailOrUsername },
      ],
    }).select("-__v");

    console.log("🚀 ~ login ~ user", user);

    if (!user) return res.send({ success: false, errorId: 1 });

    // const passMatch = await bcrypt.compare(req.body.password, user.password);
    // console.log("🚀 ~ login ~ passMatch", passMatch);

    // if (!passMatch) return res.send({ success: false, errorId: 1 });

    // const newUser = user.toObject();

    // delete newUser.password;

    // const token = jwt.sign({ id: user._id }, process.env.JWT, {
    //   expiresIn: "1h",
    // });
    // console.log("🚀 ~ login ~ token", token);

    // res.cookie("e04", token);

    res.send({ success: true, user: newUser });
  } catch (error) {
    console.log("🚀 ~ login ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const emailConfirm = async (req, res) => {
  try {
    console.log("🚀 ~ hello emailConfirm ", req.body);

    const token = req.body.token;

    const decoded = jwt.verify(token, process.env.JWT);
    console.log("🚀 ~ emailConfirm ~ decoded", decoded);

    const user = await User.findByIdAndUpdate(
      { _id: decoded.id },
      { verified: true },
      { new: true }
    );
    console.log("🚀 ~ emailConfirm ~ user", user);

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ emailConfirm ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const forgotPass = async (req, res) => {
  try {
    console.log("🚀 ~ hello forgotPass ", req.body);

    const user = await User.findOne({
      $or: [
        { username: req.body.emailOrUsername },
        { email: req.body.emailOrUsername },
      ],
    });
    console.log("🚀 ~ forgotPass ~ user", user);

    const token = jwt.sign({ id: user._id }, process.env.JWT, {
      expiresIn: "1h",
    });

    sendEmailDynamic(token, "forgotpass");

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ forgotPass ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const changePass = async (req, res) => {
  try {
    console.log("🚀 ~ hello changePass ", req.body);

    const decoded = jwt.verify(req.body.token, process.env.JWT);
    console.log("🚀 ~ changePass ~ decoded", decoded);

    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    console.log("🚀 ~ changePass ~ hashedPass", hashedPass);

    const updated = await User.findByIdAndUpdate(
      decoded.id,
      { password: hashedPass },
      { new: true }
    );
    console.log("🚀 ~ changePass ~ updated", updated);

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ changePass ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    console.log("🚀 ~ hello logout ");

    res.clearCookie("e04");

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ logout ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log("🚀 ~ hello updateProfile ", req.body);
    console.log("🚀 ~ hello updateProfile FILE: ", req.file);

    if (req.file) req.body.image = req.file.path;

    req.body.hobbies = JSON.parse(req.body.hobbies);

    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
    }).select("-password -__v");

    console.log("🚀 ~ updateProfile ~ user", user);

    if (!user) return res.send({ success: false, errorId: 1 }); // user not found

    res.send({ success: true, user });
  } catch (error) {
    console.log("🚀 ~ updateProfile ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const listUsers = async (req, res) => {
  try {
    console.log("🚀 ~ hello list ");

    let skip = 0;

    if (req.query.skip) skip = parseInt(req.query.skip);

    const limit = req.query.limit || 0;

    const users = await User.find()
      .skip(skip)
      .limit(limit)
      .select("-password -__v");

    const total = await User.countDocuments();

    res.send({ success: true, users, total });
  } catch (error) {
    console.log("🚀 ~ list users ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    console.log("🚀 ~ hello get User ", req.query);

    const id = req.query.id;

    if (!id) return res.send({ success: false, error: "No id provided" });

    const user = await User.findById(id).select("-password -__v");

    res.send({ success: true, user });
  } catch (error) {
    console.log("🚀 ~ list users ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
