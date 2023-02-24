import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Fade,
  Backdrop
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { JobApplicantsHeaders } from "./JobApplicantsHeaders";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";

const MyTable = styled(Table)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#18385C" : "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#0d294a" : "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontWeight: "bold",
}));

const CustomBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#18385C" : "white",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "700px",
  height: "90%",
  maxHeight: "1000px",
  borderRadius: 7,
}));

function JobApplicants() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      let jobID = localStorage.getItem("jobID");
      let requestOptions = {
        url: `${process.env.REACT_APP_API_URL}/job-posts/${jobID}`,
        method: "GET",
        redirect: "follow",
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/job-posts/${jobID}`,
        requestOptions
      );
      if (response.status === 200) {
        const responseData = await response.json();
        setData(responseData.results);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseMModal = () => {
    setModal(false);
  };

  return (
    <>
      <Box
        sx={{
          p: "40px",
          height: "calc(100vh - 64px)",
          maxHeight: "calc(100vh - 64px)",
          overflowY: "scroll",
        }}
        justifyContent="center"
        alignItems={"center"}
        spacing={0}
      >
        <TableContainer component={Paper} sx={{ boxShadow: 6 }}>
          <MyTable
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                {JobApplicantsHeaders.map((column) => (
                  <HeaderTableCell
                    sx={{ fontWeight: "bold" }}
                    key={column.accessor}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.HEADER}
                  </HeaderTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {JobApplicantsHeaders.map((column) => {
                      const value = row[column.accessor];
                      if (column.accessor === "url") {
                        return (
                          <TableCell key={column.accessor}>
                            <IconButton
                              aria-label="delete"
                              size="small"
                              onClick={handleOpenModal}
                              sx={{
                                transition: "0.3s",
                                "&:hover": {
                                  boxShadow: 10,
                                },
                              }}
                            >
                              <OpenInNewIcon fontSize="inherit" />
                            </IconButton>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell key={column.accessor} align="center">
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </MyTable>
        </TableContainer>
      </Box>
      <Modal
        open={modal}
        onClose={handleCloseMModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{backdropFilter: "blur(4px)" }}
        disableAutoFocus
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <CustomBox sx={{ p: 1.5, boxShadow: 19 }}>
          <iframe
            src="https://msnlabs.com/img/resume-sample.pdf#toolbar=0"
            width="100%"
            height="100%"
            style={{
              border: 'none',
              margin: '0',
              padding: '0',
            }}
          ></iframe>
        </CustomBox>
      </Modal>
    </>
  );
}

export default JobApplicants;
