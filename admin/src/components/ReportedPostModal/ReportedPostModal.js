import { Modal, useMantineTheme } from "@mantine/core";

function ReportedPostModal({ reportModalOpened, setReportModalOpened,data }) {
  const theme = useMantineTheme();
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  
  return (
    <Modal
      size={"75%"}
      centered
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={reportModalOpened}
      onClose={() => setReportModalOpened(false)}
    >
      <div className="ReportedPostModal">
        <img
          src={
            data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
          }
          alt=""
          className="postModalImage"
        />
        <div className="followers">
          <div>
            {/* <img
              src={
                data.userInfo.profilePicture
                  ? publicFolder + data.userInfo.profilePicture
                  : publicFolder + "defaultProfile.png"
              }
              alt="profile"
              className="followerImage"
            /> */}
            {/* <div className="name">
              <span>{data.userInfo.username}</span>
              <span>{time} ago</span>
            </div>
          </div>
          <div>
            <div className="detail">
              {data.comments.map((comment, id) => {
                return (
                  <span>
                    <b>{comment.username}</b> {comment.comment}
                    <br></br>
                  </span>
                );
              })}
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReportedPostModal;
