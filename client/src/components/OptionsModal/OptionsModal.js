import { Modal, useMantineTheme } from "@mantine/core";
import './OptionsModal.css'
import { useState } from "react";
import { useSelector } from "react-redux";
import ReportModal from "../ReportModal/ReportModal.jsx";
import { deletePost } from "../../api/PostsRequests.js";


function OptionsModal({ modalOpen, setModalOpen, iconRef,postId,userId }) {
  const theme = useMantineTheme();
  const [reportModalOpened,setReportModalOpened]=useState(false)
  const { user } = useSelector((state) => state.authReducer.authData);
  let isUsersPost=false

 if(userId===user._id){
   isUsersPost=true
 }
  const handleReportClick = () => {
   // setModalOpen(false); // Close the current modal
   setReportModalOpened(true); // Open the report modal
  };

  const handlePostDeletion = () => {
    deletePost(postId,user._id);
    setModalOpen(false);
  };

  return (
    <Modal
      size={"10%"}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.3}
      overlayBlur={0}
      opened={modalOpen}
      onClose={() => setModalOpen(false)}
      style={{
        position: "fixed",
        top: iconRef.current
          ? iconRef.current.getBoundingClientRect().top - 30
          : 0,
        right: iconRef.current
          ? iconRef.current.getBoundingClientRect().right - 1730
          : 0,
      }}
    >
      <div className="options">
      {isUsersPost && (
        <div>
       <div>Edit</div>
       <hr/>
       <div onClick={handlePostDeletion}>Delete</div>
       </div>
      )}
        
        {!isUsersPost && (
          <div>
        <div style={{color:"red"}} onClick={handleReportClick}>Report</div>
        <ReportModal
        reportModalOpened={reportModalOpened}
        setReportModalOpened={setReportModalOpened}
        postId={postId}/>
        </div>
        )}
      </div>
      
    </Modal>
  );
}

export default OptionsModal;
