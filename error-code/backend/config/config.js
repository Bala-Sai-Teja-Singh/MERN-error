const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log(`MongoDb Connected to ${conn.connection.host}`.yellow);
  } catch (error) {
    console.log(`Error : ${error.message}`.red);
    process.exit(1);
  }
};
module.exports = connectDb;
