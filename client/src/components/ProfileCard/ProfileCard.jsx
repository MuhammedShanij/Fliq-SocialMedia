import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link, useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { useSelector } from "react-redux";
const ProfileCard = ({ location }) => {
  let { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [profileUser, setProfileUser] = useState(user);
  const params = useParams();

  useEffect(() => {
    
    const fetchProfileUser = async () => {
      console.log("fetching");
      const profile = await UserApi.getUser(params.id);
      setProfileUser(profile.data);
    };
    if (params.id && params.id !== user._id) {
      fetchProfileUser();
    }
  }, [user,params]);
      console.log(profileUser, "userrr");

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profileUser.coverPicture
              ? serverPublic + profileUser.coverPicture
              : serverPublic + "defaultCoverr.jpg"
          }
          alt="CoverImage"
        />
        <img
          src={
            profileUser.profilePicture
              ? serverPublic + profileUser.profilePicture
              : serverPublic + "defaultProfilee.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>
          {profileUser.firstname} {profileUser.lastname}
        </span>
        <span>{profileUser.worksAt ? profileUser.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{profileUser.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{profileUser.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === profileUser._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${profileUser._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
