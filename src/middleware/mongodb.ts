import { NextApiHandler } from "next";
import mongoose from "mongoose";

const withMongoDB: (handler: NextApiHandler) => NextApiHandler = (
	handler
) => async (req, res) => {
	if (mongoose.connections[0].readyState) {
		return handler(req, res);
	}
	await mongoose.connect(
		`${process.env.DB_LINK}`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
	return handler(req, res);
};

export default withMongoDB;
