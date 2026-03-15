const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  const user = await User.findByUsername(username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isPasswordValid = await User.comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Login successful",
    token
  });
};

const protectedRoute = (req, res) => {
  return res.status(200).json({
    message: "Protected route accessed",
    user: req.user
  });
};

const logout = (req, res) => {
  return res.status(200).json({
    message: "Logout successful. Delete token on client side for stateless logout."
  });
};

module.exports = {
  login,
  protectedRoute,
  logout
};
