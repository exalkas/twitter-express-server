import Post from "../models/Post.js";

export const add = async (req, res) => {
  try {
    console.log("🚀 ~ hello add ", req.body);

    req.body.owner = req.user;

    // if (req.file) req.body.image = req.file.path
    // console.log("🚀 ~ add ~ req.file", req.file)

    const post = await (
      await Post.create(req.body)
    ).populate({ path: "owner", select: "username email image" });

    console.log("🚀 ~ add ~ post", post);

    res.send({ success: true, post });
  } catch (error) {
    console.log("🚀 ~ add ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const list = async (req, res) => {
  try {
    console.log("🚀 ~ hello list ");

    const posts = await Post.find()
      .select("-__v")
      .populate({ path: "owner", select: "username email image" }) // post owner
      .populate({ path: "comments.owner", select: "username email image" }); // comment owner

    res.send({ success: true, posts });
  } catch (error) {
    console.log("🚀 ~ list ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    console.log("🚀 ~ hello deletePost ", req.body);

    const deletedPost = await Post.findByIdAndDelete({
      _id: req.body.id,
      owner: req.user,
    });

    if (!deletedPost) return res.send({ success: false, errorId: 1 }); // not found

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ deletePost ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const edit = async (req, res) => {
  try {
    console.log("🚀 ~ hello edit ", req.body);

    const { postId: _id, owner, text } = req.body;

    if (req.user !== req.body.owner)
      return res.send({ success: false, errorId: 0 });

    const newPost = await Post.findByIdAndUpdate(
      {
        _id,
        owner,
      },
      { text },
      { new: true }
    );
    console.log("🚀 ~ edit ~ newPost", newPost);

    res.send({ success: true });
  } catch (error) {
    console.log("🚀 ~ edit ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const like = async (req, res) => {
  try {
    console.log("🚀 ~ hello like ", req.body);

    const post = await Post.findById(req.body.postId);
    console.log("🚀 ~ like ~ post", post);

    const user = post.likes.includes(req.user);
    console.log("🚀 ~ like ~ user", user);

    let newPost = {};

    if (user) {
      // user IS in the likes array

      newPost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $pull: {
            // deletes all items that match the criteria
            likes: req.user,
          },
        },
        { new: true }
      );
      console.log("🚀 ~ like ~ newPost", newPost);
    } else {
      // user is NOT in the likes array

      newPost = await Post.findByIdAndUpdate(
        req.body.postId,
        {
          $addToSet: {
            likes: req.user,
          },
        },
        { new: true }
      );
      console.log("🚀 ~ like ~ newPost", newPost);
    }

    res.send({ success: true, likes: newPost.likes });
  } catch (error) {
    console.log("🚀 ~ like ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
