const bcrypt = require("bcryptjs");
const Users = [
  {
    name: "admin",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "teja",
    email: "balasaiteja2003@gmail.com",
    password: bcrypt.hashSync("balasai09", 10),
  },
  {
    name: "user",
    email: "user@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

module.exports = Users;
