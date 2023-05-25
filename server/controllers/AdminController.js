import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import PostModel from "../models/postModel.js";
import postsReportModel from "../models/postsReportModel.js";

//admin login
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {

    if (username === process.env.ADMIN_USERNAME) {
      
      if (password != process.env.ADMIN_PASSWORD) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { username: username},
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ token });
      }
    } else {
      res.status(404).json("Admin not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {

    try {
      let users = await UserModel.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
};

export const blockManagement = async (req, res) => {
  console.log(req.body);
    const userId = req.body._id;
    const blockStatus = req.body.isBlocked;
    try {
      let user = await UserModel.findByIdAndUpdate(userId,{isBlocked:!blockStatus},{new:true});        
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      {
        $addFields: {
          userId: { $toObjectId: "$userId" },
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
        $project: {
          _id: 1,
          userId: 1,
          desc: 1,
          likes: 1,
          image: 1,
          createdAt: 1,
          // isReported:1,
          "userInfo.username": 1,
          "userInfo.profilePicture": 1,
        },
      },
    ]);
    console.log("posts",posts)
    res.status(200).json(
      posts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getAllReportedPost = async (req, res) => {
  try {
    const reportedPosts = await postsReportModel.aggregate([
      {
        $addFields: {
          userId: { $toObjectId: "$userId" },
          postId: { $toObjectId: "$postId" },
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
          from: "posts",
          localField: "postId",
          foreignField: "_id",
          as: "postInfo",
        },
      },
      {
        $unwind: "$postInfo",
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          postId:1,
          reason:1,
          createdAt:1,
          "userInfo":1,
          "postInfo":1
        },
      },
    ]);
    console.log("data",reportedPosts)
    res.status(200).json(
      reportedPosts.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    );
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};


