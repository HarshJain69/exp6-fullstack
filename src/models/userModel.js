const bcrypt = require("bcrypt");

const users = [
  {
    id: 1,
    username: "user123",
    passwordHash: bcrypt.hashSync("password123", 10)
  }
];

const findByUsername = async (username) => {
  return users.find((user) => user.username === username) || null;
};

const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
  findByUsername,
  comparePassword
};
