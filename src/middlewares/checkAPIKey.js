import dotenv from "dotenv";

dotenv.config();

const apiKeys = JSON.parse(process.env.API_KEYS);

export default function checkAPIKey(req, res, next) {
  const apiKey = req.query.api_key;

  if (!apiKey) {
    return res
      .status(401)
      .json({ success: false, message: "No API key provided" });
  }

  if (!apiKeys.includes(apiKey)) {
    return res.status(403).json({ success: false, message: "Invalid API key" });
  }

  next();
}
