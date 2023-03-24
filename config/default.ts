import * as dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  dbUri: process.env.DB_URI,
  saltWorkFactor: process.env.SALT_WORK_FACTOR,
};
