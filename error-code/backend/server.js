const dotenv = require("dotenv");
dotenv.config();
// var cors = require("cors");
const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
require("colors");
const products = require("./data/products");
const connectDb = require("./config/config");
const productRoutes = require("./routes/ProductsRoute");
const usersRoutes = require("./routes/UsersRoute");
const orderRoutes = require("./routes/OrderRoute");
// dotenv config
// Connecting to mongo db database
dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome To Node Server</h1>");
});

app.use("/api", productRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
app.use(errorHandler);

const PORT = 8000;
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`
      .inverse
  );
});
