import { User } from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, resp) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(401).json({
        message: "Empty Data",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return resp.status(401).json({
        message: "Email is not yet registered!",
        success: false,
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return resp.status(401).json({
        message: "email or password is incorrect!",
        success: false,
      });
    }

    const tokenData = {
      id: user._id,
    };

    const token = await jwt.sign(tokenData, "asdfrgthyjhgwsdfgh", {
      expiresIn: "1h",
    });

    return resp
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({
        message: `Welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = async (req, resp) => {
  return resp
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true })
    .json({
      message: "Logged out successfully!",
      success: true,
    });
};

export const Register = async (req, resp) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(email, password);

    if (!fullName || !email || !password) {
      return resp.status(401).json({
        Message: "Empty data",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return resp.status(401).json({
        message: "Email ID already exist",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    return resp.status(201).json({
      message: "Your Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(`myeeror ${error}`);
  }
};
