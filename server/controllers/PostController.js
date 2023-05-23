import PostModel from "../models/postModel.js";
import UserModel from "../models/userModel.js";
import CommentModel from "../models/commentModel.js";

import mongoose from "mongoose";

// creating a post

export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();

    const post = JSON.parse(JSON.stringify(newPost));
    post.userInfo = {};
    let users = await UserModel.find();

    users.forEach((user) => {
      if (user._id.toString() === post.userId.toString()) {
        post.userInfo.username = user.username;
        if (user.profilePicture)
          post.userInfo.profilePicture = user.profilePicture;
      }
    });
    post.comments = [];

    console.log(post);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed");
    }
  } catch (error) {}
};

// delete a post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    // const currentUserPosts = await PostModel.find({ userId: userId });

    // let followingPosts = await UserModel.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(userId),
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "following",
    //       foreignField: "userId",
    //       as: "followingPosts",
    //     },
    //   },
    //   {
    //     $project: {
    //       followingPosts: 1,
    //       _id: 0,
    //     },
    //   },
    // ]);

    // let users = await UserModel.find();
    // followingPosts = currentUserPosts.concat(followingPosts[0].followingPosts);
    // let newArray = JSON.parse(JSON.stringify(followingPosts));

    // console.log(followingPosts, "posts are here------------------------");
    // // console.log(users)
    // for (let i = 0; i < newArray.length; i++) {
    //   users.forEach((user) => {
    //     // console.log(user._id)
    //     if (user._id.toString() === newArray[i].userId.toString()) {
    //       console.log(
    //         "here",
    //         user._id.toString(),
    //         newArray[i].userId.toString()
    //       );
    //       newArray[i].username = user.username;
    //       if (user.profilePicture)
    //         newArray[i].profilePicture = user.profilePicture;
    //     }
    //   });
    // }
    // let followingPostsDetails = followingPosts.map((post) => {

    //   users.forEach((user) => {
    //     if (user._id == post.userId) {

    //       post.username = user.username;

    //     }
    //   });

    //   return {

    //     ...post

    //   }
    // });

    // let followingPostsDetails = followingPosts.map((post) => {
    //   users.forEach((user) => {
    //     if (user._id == post.userId) {
    //       post.username = user.username;
    //     }
    //   });
    //   return post.toObject({ getters: true });
    // });

    // console.log("details", newArray);
    // console.log("details", followingPosts);

    const user = await UserModel.findById(userId);
    const followingIds = user.following;
    followingIds.push(userId);
    console.log(followingIds);

    // const postsWithUserInfo = await PostModel.aggregate([
    //   {
    //     $addFields: {
    //       userId: { $toObjectId: "$userId" },
    //     },
    //   },
    //   {
    //     $match: {
    //       userId: {
    //         $in: followingIds.map((id) => mongoose.Types.ObjectId(id)),
    //       },
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "userId",
    //       foreignField: "_id",
    //       as: "userInfo",
    //     },
    //   },
    //   {
    //     $unwind: "$userInfo",
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       desc: 1,
    //       likes: 1,
    //       image: 1,
    //       createdAt: 1,
    //       "userInfo.username": 1,
    //       "userInfo.profilePicture": 1,
    //     },
    //   },
    // ]);

    // console.log("posts", postsWithUserInfo);
    // const timeline = postsWithUserInfo.sort((a, b) => {
    //   return new Date(b.createdAt) - new Date(a.createdAt);
    // });
    // console.log("time", timeline);

    const postsWithComments = await PostModel.aggregate([
      {
        $addFields: {
          userId: { $toObjectId: "$userId" },
        },
      },
      {
        $match: {
          userId: {
            $in: followingIds.map((id) => mongoose.Types.ObjectId(id)),
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "commentUsers",
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          desc: 1,
          likes: 1,
          image: 1,
          isReported:1,
          createdAt: 1,
          "userInfo.username": 1,
          "userInfo.profilePicture": 1,
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                $mergeObjects: [
                  "$$comment",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$commentUsers",
                          cond: { $eq: ["$$this._id", "$$comment.userId"] },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    ]);

    res.status(200).json(
      postsWithComments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
export const addComment = async (req, res) => {
  req.body.userId = mongoose.Types.ObjectId(req.body.userId);
  req.body.postId = mongoose.Types.ObjectId(req.body.postId);
  const newComment = new CommentModel(req.body);
  const user = await UserModel.findById(req.body.userId);
  const followingIds = user.following;
  followingIds.push(req.body.userId)

  try {
    const comment = await newComment.save();
    // const post = await PostModel.findById(id);
    // res.status(200).json(post);
    const postsWithComments = await PostModel.aggregate([
      {
        $addFields: {
          userId: { $toObjectId: "$userId" },
        },
      },
      {
        $match: {
          userId: {
            $in: followingIds.map((id) => mongoose.Types.ObjectId(id)),
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "commentUsers",
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          desc: 1,
          likes: 1,
          image: 1,
          createdAt: 1,
          "userInfo.username": 1,
          "userInfo.profilePicture": 1,
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                $mergeObjects: [
                  "$$comment",
                  {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$commentUsers",
                          cond: { $eq: ["$$this._id", "$$comment.userId"] },
                        },
                      },
                      0,
                    ],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    console.log(postsWithComments)

    res.status(200).json(
      postsWithComments.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
};
