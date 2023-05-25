import { Modal, useMantineTheme } from "@mantine/core";
import { reportData } from "../../utils/Constants.js";
import { useSelector } from "react-redux";
import { reportPost } from "../../api/PostsRequests.js";

function ReportModal({ reportModalOpened, setReportModalOpened,postId }) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const theme = useMantineTheme();
  const handleReportData = (data)=>{
    const reportData={
      postId:postId,
      userId:user._id,
      reason:data
    }
    console.log(reportData)
    reportPost(reportData)
    setReportModalOpened(false)
  }
  return (
    <Modal
      size={"20%"}
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
      <div>
        <div style={{textAlign:"center",fontWeight:"bold",color:"red"}}>Report</div>
        <b><hr/></b>
        <div style={{fontWeight:"bolder"}}>Why are you reporting this post?</div>       
       <hr/>
       
       { reportData.map((data,id)=>{
        return (
            <div className="reportOptions" key={id} onClick={()=>{              
              handleReportData(data);
            }}>
                <span>{data}</span>
                <hr/>
            </div>
        )
       })}
      </div>
    </Modal>
  );
}

export default ReportModal;
