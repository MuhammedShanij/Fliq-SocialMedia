import mongoose from "mongoose";
var ObjectId=mongoose.ObjectId

const postsReportSchema = mongoose.Schema(
  {
    userId: { type:ObjectId , required: true },
    postId: { type: ObjectId, required: true },
    reason: {type: String, required : true},
    isReported:{type:Boolean,default:false}   
  },
  {
    timestamps: true,
  }
);

var postsReportModel = mongoose.model("reports", postsReportSchema);

export default postsReportModel;


