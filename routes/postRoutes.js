import express from "express";
import {
  list,
  listOne,
  search,
  listByUser,
  add,
  deletePost,
  edit,
  like,
} from "../controllers/postController.js";

// import {addComment, deleteComment, editComment, editCommentJS} from '../controllers/commentController.js'

const router = express.Router();

router.get("/list", list);
router.get("/listone", listOne);
router.get("/search", search);
router.get("/listbyuser", listByUser);
router.post("/add", add);
router.delete("/delete", deletePost);
router.put("/edit", edit);
// router.patch('/likes', auth, like)

// Comments section
// router.post('/comments/add', auth, addComment)
// router.delete('/comments/delete/:postId/:commentId', auth, deleteComment)
// router.patch('/comments/edit', auth, editCommentJS)

export default router;
