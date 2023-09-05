const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async () => {
  await mongoose.connect(
    process.env.MONGO,
    console.log("MongoDB Connected khush ho jao")
  );
};

module.exports = connectDB;
