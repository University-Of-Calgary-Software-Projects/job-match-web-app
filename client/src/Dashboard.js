import { useHistory } from "react-router-dom";
import { Paper, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Dashboard() {
  const history = useHistory();
  return (
    <Stack
      direction={"row"}
      spacing={6}
      sx={{
        p: "40px",
        height: "calc(100vh - 64px)",
        maxHeight: "calc(100vh - 64px)",
        overflowX: "scroll",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#5C95F7",
          height: 240,
          display: "inline",
          width: "30%",
          maxWidth: "300px",
          minWidth: "200px",
          borderRadius: "10px",
          marginLeft: "5%",
          boxShadow: 7,
          WebkitUserSelect: "none",
          useSelect: "none",
          ":hover": {
            boxShadow: 20,
          },
        }}
        onClick={() => history.push("/applications")}
      >
        <Stack height="100%" justifyContent={"space-between"} p={3}>
          <Typography></Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            p={0}
            alignItems={"center"}
            color="white"
          >
            <Typography fontSize="22px" fontWeight="525" maxWidth={"70%"}>
              View My Applications
            </Typography>
            <ArrowForwardIcon fontSize="large" />
          </Stack>
        </Stack>
      </Paper>
      <Paper
        sx={{
          backgroundColor: "#5C95F7",
          height: 240,
          display: "inline",
          width: "30%",
          maxWidth: "300px",
          minWidth: "200px",
          borderRadius: "10px",
          boxShadow: 7,
          WebkitUserSelect: "none",
          useSelect: "none",
          ":hover": {
            boxShadow: 20,
          },
        }}
        onClick={() => history.push("/job-posts")}
      >
        <Stack height="100%" justifyContent={"space-between"} p={3}>
          <Typography></Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            p={0}
            alignItems={"center"}
            color="white"
          >
            <Typography fontSize="22px" fontWeight="525" maxWidth={"70%"}>
              Explore New Jobs
            </Typography>
            <ArrowForwardIcon fontSize="large" />
          </Stack>
        </Stack>
      </Paper>
      <Paper
        sx={{
          backgroundColor: "#5C95F7",
          height: 240,
          display: "inline",
          width: "30%",
          maxWidth: "300px",
          minWidth: "200px",
          borderRadius: "10px",
          boxShadow: 7,
          WebkitUserSelect: "none",
          useSelect: "none",
          ":hover": {
            boxShadow: 20,
          },
        }}
        onClick={() => history.push("/offers")}
      >
        <Stack height="100%" justifyContent={"space-between"} p={3}>
          <Typography></Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            p={0}
            alignItems={"end"}
            color="white"
          >
            <Typography fontSize="22px" fontWeight="525" maxWidth={"70%"}>
              View My Offers
            </Typography>
            <ArrowForwardIcon fontSize="large" />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Dashboard;
