import { Modal, useMantineTheme } from "@mantine/core";
import './ReportedPostModal.css'
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
            data.image ? "process.env.REACT_APP_PUBLIC_FOLDER + data.image" : ""
          }
          alt=""
          className="postImg"
        />
        <div className="followers">
          <div>
            <img
              src={
                data.profilePicture
                  ? publicFolder + data.profilePicture
                  : publicFolder + "defaultProfile.png"
              }
              alt="profile"
              className="followerImage"
            />
            <div className="name">
              <span>{data.username}</span>
              <span> ago</span>
            </div>
          </div>
          <div>
            <div className="detail">
              {/* {comments.map((comment, id) => {
                return (
                  <span>
                    <b>{comment.username}</b> {comment.comment}
                    <br></br>
                  </span>
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ReportedPostModal;
