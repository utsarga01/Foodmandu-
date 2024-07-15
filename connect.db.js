import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://regmiutsarga7:Nipani321@cluster0.kpjiesk.mongodb.net/kec-foodmandu?retryWrites=true&w=majority&appName=Cluster0`
    );//${encodeURIComponent("..password..")}if the password has @ and space
    console.log("DB connection established...");
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
  }
};

export default connectDB;
