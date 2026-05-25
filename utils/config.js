const { JWT_SECRET = "dev-secret-key" } = process.env;
const { MONGO_URI = "mongodb://localhost:27017/wtwr_db" } = process.env;

module.exports = {
  JWT_SECRET,
  MONGO_URI,
};
