const { JWT_SECRET = "dev-secret-key" } = process.env;

// Support common MongoDB env variable names used by local and hosted setups.
const MONGO_URI = process.env.MONGO_URI
  || process.env.MONGODB_URI
  || process.env.DATABASE_URL
  || "mongodb://127.0.0.1:27017/wtwr_db?directConnection=true";

module.exports = {
  JWT_SECRET,
  MONGO_URI,
};
