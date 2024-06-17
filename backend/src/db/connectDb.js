import mongoose from "mongoose";

export const connectDB = async function () {
  try {
    // Establish connec. to the MongoDB database.
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URL + "/entertainment-app"
    );

    // Log to a successful connection message.
    console.log(
      "Database connection established  "
    );
  } catch (error) {
    // Log any errors, occur during connection.
    console.log("Database connection error: " + error.message);
    // Terminate the application if a connection err occurs.
    process.exit(1);
  }
};
