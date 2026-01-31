const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.register = async (req,res) => {
  const { name,email,password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg:"User exists" });

  const user = await User.create({ name,email,password });

  res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token: generateToken(user._id)
  });
};

exports.login = async (req,res) => {
  const { email,password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg:"Invalid credentials" });

  const ok = await bcrypt.compare(password,user.password);
  if (!ok) return res.status(400).json({ msg:"Invalid credentials" });

  res.json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token: generateToken(user._id)
  });
};
