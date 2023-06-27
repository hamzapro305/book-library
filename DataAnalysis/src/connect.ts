import mongoose from "mongoose";

const connectToDatabase = (): Promise<boolean> => {
	return new Promise(async (res, rej) => {
		try {
			await mongoose.connect("mongodb://localhost:27017/BookLibrary", {});
			console.log("Connected to MongoDB");
			res(true);
		} catch (error) {
			console.error("Error connecting to MongoDB:", error);
			rej(false);
		}
	});
};

export default connectToDatabase;
