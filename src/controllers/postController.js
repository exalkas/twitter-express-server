import Post from "../models/Post.js";

export const add = async (req, res) => {
  try {
    console.log("🚀 ~ hello add ", req.body);

    const post = await (
      await Post.create(req.body)
    ).populate({
      path: "owner",
      select: "username email image",
    });

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

    let skip = 0;

    if (req.query.skip) skip = parseInt(req.query.skip);

    const limit = req.query.limit || 0;

    const posts = await Post.find()
      .skip(skip)
      .limit(limit)
      .select("-__v")
      .populate({ path: "owner", select: "username email image" }); // post owner

    const total = await Post.countDocuments();

    res.send({ success: true, posts, total });
  } catch (error) {
    console.log("🚀 ~ list ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
export const listOne = async (req, res) => {
  try {
    console.log("🚀 ~ hello listOne ");

    const id = req.query.id;

    if (!id) return res.send({ success: false, error: "No tweet id provided" });

    const post = await Post.findById(id)
      .select("-__v")
      .populate({ path: "owner", select: "username email image" }); // post owner

    res.send({ success: true, post });
  } catch (error) {
    console.log("🚀 ~ listOne ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};
export const search = async (req, res) => {
  try {
    console.log("🚀 ~ hello search ");

    const text = req.query.text;
    console.log("🚀 ~ text:", text);

    if (!text)
      return res.send({ success: false, error: "No search text provided" });

    const regExp = new RegExp(text, "i");

    const posts = await Post.find({
      text: regExp,
    })
      .select("-__v")
      .populate({ path: "owner", select: "username email image" }); // post owner

    res.send({ success: true, posts });
  } catch (error) {
    console.log("🚀 ~ search ~ error", error.message);

    res.send({ success: false, error: error.message });
  }
};

export const listByUser = async (req, res) => {
  try {
    console.log("🚀 ~ hello listByUser ");

    const owner = req.query.user;

    if (!owner) return res.send({ success: false, error: "No user provided" });

    const posts = await Post.find({ owner })
      .select("-__v")
      .populate({ path: "owner", select: "username email image" }); // post owner

    res.send({ success: true, posts });
  } catch (error) {
    console.log("🚀 ~ listByUser ~ error", error.message);

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
