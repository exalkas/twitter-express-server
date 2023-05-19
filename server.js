import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import db from "./config/db.js";
// import cookieParser from 'cookie-parser'
// import Post from "./models/Post.js";

dotenv.config();
const app = express();

db();
// app.use(cookieParser());
app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log("Server is up and running at port", port));

// ADD TWEETS

// const tweets = [
//   {
//     _id: "615cf0362b3e8272f6c87511",
//     owner: "615cefd72b3e8272f6c87501",
//     text: "Just finished reading a great book!",
//     date: "2023-05-19T10:00:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87512",
//     owner: "615cefd72b3e8272f6c87502",
//     text: "Enjoying a sunny day at the beach.",
//     date: "2023-05-19T11:30:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87513",
//     owner: "615cefd72b3e8272f6c87503",
//     text: "Trying out a new recipe for dinner tonight.",
//     date: "2023-05-19T12:45:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87514",
//     owner: "615cefd72b3e8272f6c87504",
//     text: "Excited to visit Japan next month!",
//     date: "2023-05-19T14:20:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87515",
//     owner: "615cefd72b3e8272f6c87505",
//     text: "Just reached level 50 in my favorite game.",
//     date: "2023-05-19T15:10:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87516",
//     owner: "615cefd72b3e8272f6c87506",
//     text: "Feeling inspired to write a new story.",
//     date: "2023-05-19T16:25:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87517",
//     owner: "615cefd72b3e8272f6c87507",
//     text: "Practicing my guitar skills today.",
//     date: "2023-05-19T17:15:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87518",
//     owner: "615cefd72b3e8272f6c87508",
//     text: "Enjoying a cup of coffee and a good book.",
//     date: "2023-05-19T18:40:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87519",
//     owner: "615cefd72b3e8272f6c87509",
//     text: "Exploring the bustling streets of Mumbai.",
//     date: "2023-05-19T19:30:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87520",
//     owner: "615cefd72b3e8272f6c87510",
//     text: "Planning my next travel adventure.",
//     date: "2023-05-19T20:55:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87521",
//     owner: "615cefd72b3e8272f6c87501",
//     text: "Attended a fascinating photography exhibition today.",
//     date: "2023-05-18T13:20:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87522",
//     owner: "615cefd72b3e8272f6c87502",
//     text: "Missing the beautiful streets of Paris.",
//     date: "2023-05-18T14:45:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87523",
//     owner: "615cefd72b3e8272f6c87503",
//     text: "Excited for the weekend hiking trip!",
//     date: "2023-05-18T16:00:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87524",
//     owner: "615cefd72b3e8272f6c87504",
//     text: "Just watched an amazing movie.",
//     date: "2023-05-18T17:30:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87525",
//     owner: "615cefd72b3e8272f6c87505",
//     text: "Cheering for my favorite team in the match tonight.",
//     date: "2023-05-18T19:15:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87526",
//     owner: "615cefd72b3e8272f6c87506",
//     text: "Loving the peaceful moments in nature.",
//     date: "2023-05-18T20:25:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87527",
//     owner: "615cefd72b3e8272f6c87507",
//     text: "Working on a new coding project.",
//     date: "2023-05-18T21:50:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87528",
//     owner: "615cefd72b3e8272f6c87508",
//     text: "Attending an art exhibition tonight.",
//     date: "2023-05-18T23:10:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87529",
//     owner: "615cefd72b3e8272f6c87509",
//     text: "Enjoying a delicious street food feast.",
//     date: "2023-05-17T12:30:00Z",
//   },
//   {
//     _id: "615cf0362b3e8272f6c87530",
//     owner: "615cefd72b3e8272f6c87510",
//     text: "Celebrating my birthday with friends and family.",
//     date: "2023-05-17T14:15:00Z",
//   },
// ];

// async function addTweets(req, res) {
//   try {
//     const result = await Post.insertMany(tweets);
//     console.log("🚀 ~ result:", result);
//   } catch (error) {
//     console.log("🚀 ~ error:", error.message);
//   }
// }
// addTweets();
