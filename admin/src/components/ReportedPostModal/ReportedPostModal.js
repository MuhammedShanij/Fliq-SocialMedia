import React from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import './ReportedPostModal.css'
function ReportedPostModal({ reportModalOpened, setReportModalOpened,data }) {
  const theme = useMantineTheme();
  
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  console.log(data);
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
   {data.map((post)=>{
    return <div>{post.reason} - {post.user.username}</div>
   })}
      </div>
    </Modal>
  );
}

export default ReportedPostModal;
